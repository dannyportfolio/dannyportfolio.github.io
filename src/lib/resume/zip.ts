/**
 * Minimal, zero-dependency store-only ZIP archive builder and reader for client-side DOCX export.
 * Uses UTF-8 filenames (flag 0x0800) and standard IEEE 802.3 CRC32 checksums.
 */

export type ZipEntryInput = {
  name: string;
  content: Uint8Array | string;
};

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

export function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBytes(content: Uint8Array | string): Uint8Array {
  return typeof content === "string" ? encoder.encode(content) : content;
}

function writeU16(view: DataView, offset: number, value: number) {
  view.setUint16(offset, value, true);
}

function writeU32(view: DataView, offset: number, value: number) {
  view.setUint32(offset, value >>> 0, true);
}

export function createStoreZip(entries: ZipEntryInput[]): Uint8Array {
  const localChunks: Uint8Array[] = [];
  const centralChunks: Uint8Array[] = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name);
    const dataBytes = toBytes(entry.content);
    const checksum = crc32(dataBytes);

    const localHeader = new Uint8Array(30 + nameBytes.length);
    const lhv = new DataView(localHeader.buffer);
    writeU32(lhv, 0, 0x04034b50);
    writeU16(lhv, 4, 20);
    writeU16(lhv, 6, 0x0800); // UTF-8 filename flag
    writeU16(lhv, 8, 0); // compression method 0 = store
    writeU16(lhv, 10, 0);
    writeU16(lhv, 12, 0x5421); // fixed MS-DOS timestamp for deterministic ZIP output
    writeU32(lhv, 14, checksum);
    writeU32(lhv, 18, dataBytes.length);
    writeU32(lhv, 22, dataBytes.length);
    writeU16(lhv, 26, nameBytes.length);
    writeU16(lhv, 28, 0);
    localHeader.set(nameBytes, 30);

    localChunks.push(localHeader, dataBytes);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const chv = new DataView(centralHeader.buffer);
    writeU32(chv, 0, 0x02014b50);
    writeU16(chv, 4, 20);
    writeU16(chv, 6, 20);
    writeU16(chv, 8, 0x0800);
    writeU16(chv, 10, 0);
    writeU16(chv, 12, 0);
    writeU16(chv, 14, 0x5421);
    writeU32(chv, 16, checksum);
    writeU32(chv, 20, dataBytes.length);
    writeU32(chv, 24, dataBytes.length);
    writeU16(chv, 28, nameBytes.length);
    writeU16(chv, 30, 0);
    writeU16(chv, 32, 0);
    writeU16(chv, 34, 0);
    writeU16(chv, 36, 0);
    writeU32(chv, 38, 0);
    writeU32(chv, 42, offset);
    centralHeader.set(nameBytes, 46);

    centralChunks.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  }

  const centralSize = centralChunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  writeU32(ev, 0, 0x06054b50);
  writeU16(ev, 4, 0);
  writeU16(ev, 6, 0);
  writeU16(ev, 8, entries.length);
  writeU16(ev, 10, entries.length);
  writeU32(ev, 12, centralSize);
  writeU32(ev, 16, offset);
  writeU16(ev, 20, 0);

  const totalSize = offset + centralSize + eocd.length;
  const output = new Uint8Array(totalSize);
  let cursor = 0;

  for (const chunk of localChunks) {
    output.set(chunk, cursor);
    cursor += chunk.length;
  }
  for (const chunk of centralChunks) {
    output.set(chunk, cursor);
    cursor += chunk.length;
  }
  output.set(eocd, cursor);

  return output;
}

/** Reads store-only ZIP local entries and verifies CRC32 checksums (used by unit tests). */
export function readStoreZipTextEntries(bytes: Uint8Array): Record<string, string> {
  const result: Record<string, string> = {};
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let pos = 0;

  while (pos + 30 <= bytes.length) {
    const sig = view.getUint32(pos, true);
    if (sig !== 0x04034b50) break;

    const method = view.getUint16(pos + 8, true);
    if (method !== 0) {
      throw new Error(`Unsupported compression method ${method}`);
    }
    const expectedCrc = view.getUint32(pos + 14, true);
    const compressedSize = view.getUint32(pos + 18, true);
    const nameLength = view.getUint16(pos + 26, true);
    const extraLength = view.getUint16(pos + 28, true);

    const nameStart = pos + 30;
    const dataStart = nameStart + nameLength + extraLength;
    const dataEnd = dataStart + compressedSize;

    const name = decoder.decode(bytes.subarray(nameStart, nameStart + nameLength));
    const contentBytes = bytes.subarray(dataStart, dataEnd);
    const actualCrc = crc32(contentBytes);
    if (actualCrc !== expectedCrc) {
      throw new Error(`CRC mismatch for ${name}: expected ${expectedCrc}, got ${actualCrc}`);
    }

    result[name] = decoder.decode(contentBytes);
    pos = dataEnd;
  }

  return result;
}
