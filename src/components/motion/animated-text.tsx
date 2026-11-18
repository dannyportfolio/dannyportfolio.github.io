import type { CSSProperties, ReactNode } from "react";
import { buildAccessibleText, indexWordSegments, type WordSegment } from "@/lib/motion/text";

export type { WordSegment };

export function AnimatedWords({
  text,
  segments,
  as = "h1",
  className = "",
  baseDelayMs = 45,
  stepMs = 32,
  maxSpreadMs = 320,
}: {
  text?: string;
  segments?: WordSegment[];
  as?: "h1" | "h2" | "p";
  className?: string;
  baseDelayMs?: number;
  stepMs?: number;
  maxSpreadMs?: number;
}) {
  const resolvedSegments: WordSegment[] = segments ?? (text ? [{ text }] : []);
  const accessibleText = buildAccessibleText(resolvedSegments);
  const { segments: indexedSegments, totalWords } = indexWordSegments(resolvedSegments);
  const Tag = as;

  const effectiveStep =
    totalWords > 1 ? Math.min(stepMs, Math.floor(maxSpreadMs / (totalWords - 1))) : 0;

  return (
    <Tag className={className || undefined} aria-label={accessibleText}>
      <span className="word-reveal-root" aria-hidden="true">
        {indexedSegments.map((segment, segIdx) => {
          const needsLeadingSpace = segIdx > 0 && !segment.breakBefore;

          const wordNodes = segment.words.map(({ word, globalIndex }, wordIdx) => {
            const delay = baseDelayMs + globalIndex * effectiveStep;
            const isLastWordInSegment = wordIdx === segment.words.length - 1;

            return (
              <span key={`${segIdx}-${wordIdx}`}>
                <span className="word-clip">
                  <span
                    className="word-token"
                    style={{ "--word-delay": `${delay}ms` } as CSSProperties}
                  >
                    {word}
                  </span>
                </span>
                {!isLastWordInSegment ? " " : null}
              </span>
            );
          });

          return (
            <span key={segIdx}>
              {segment.breakBefore && <br />}
              {needsLeadingSpace && " "}
              {segment.accent ? (
                <em className={segment.className}>{wordNodes}</em>
              ) : segment.className ? (
                <span className={segment.className}>{wordNodes}</span>
              ) : (
                wordNodes
              )}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

export function AnimatedIntro({
  as = "p",
  className = "",
  delay = 150,
  children,
}: {
  as?: "p" | "div";
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const Tag = as;
  return (
    <Tag
      className={`intro-reveal ${className}`.trim()}
      style={{ "--intro-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
