export type WordSegment = {
  text: string;
  accent?: boolean;
  breakBefore?: boolean;
  className?: string;
};

export type IndexedWordSegment = WordSegment & {
  words: { word: string; globalIndex: number }[];
};

export function tokenizeWords(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed.split(/\s+/);
}

export function buildAccessibleText(segments: WordSegment[]): string {
  return segments
    .map((segment) => segment.text.trim())
    .filter(Boolean)
    .join(" ");
}

export function indexWordSegments(segments: WordSegment[]): {
  segments: IndexedWordSegment[];
  totalWords: number;
} {
  let cursor = 0;
  const indexed = segments.map((segment) => {
    const tokens = tokenizeWords(segment.text);
    const words = tokens.map((word, offset) => ({
      word,
      globalIndex: cursor + offset,
    }));
    cursor += tokens.length;
    return { ...segment, words };
  });

  return { segments: indexed, totalWords: cursor };
}
