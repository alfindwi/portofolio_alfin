"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React from "react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: isMobile ? ["start center", "end center"] : ["start 85%", "end center"],
  });

  const nodes = React.Children.toArray(children);

  const allWords: string[] = [];
  nodes.forEach((node) => {
    if (typeof node === "string") {
      allWords.push(...node.split(" ").filter(Boolean));
    }
  });

  let wordIndex = 0;

  return (
    <div ref={targetRef} className={className}>
      <div className="flex flex-col gap-2">
        {nodes.map((node, lineIndex) => {
          if (typeof node === "string") {
            const words = node.split(" ").filter(Boolean);
            return (
              <span
                key={lineIndex}
                className="flex flex-wrap text-white/40 dark:text-white/20 "
              >
                {words.map((word, i) => {
                  const start = wordIndex / allWords.length;
                  const end = start + 1 / allWords.length;
                  wordIndex++;
                  return (
                    <Word key={`${lineIndex}-${i}`} progress={scrollYProgress} range={[start, end]}>
                      {word}
                    </Word>
                  );
                })}
              </span>
            );
          }
          if (node === <br />) {
            return <br key={lineIndex} />;
          }
          return node;
        })}
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-50">{children}</span>
      <motion.span style={{ opacity }} className="text-white dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};