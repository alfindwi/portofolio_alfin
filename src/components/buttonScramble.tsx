"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

type ButtonItemProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

export function ButtonItem({ text, onClick, className = "" }: ButtonItemProps) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    const txtEl = textRef.current;
    if (!el || !txtEl) return;

    // ✅ Hitung lebar awal dan kunci dengan min-width
    const textWidth = getTextWidth(text, getComputedStyle(txtEl));
    txtEl.style.display = "inline-block";
    txtEl.style.minWidth = `${textWidth}px`;
    txtEl.style.whiteSpace = "nowrap";
    txtEl.style.overflow = "hidden";

    const scramble = (toText: string) => {
      gsap.to(txtEl, {
        duration: 0.7,
        scrambleText: {
          text: toText,
          chars: "01",
          speed: 0.15,
          revealDelay: 0.15,
          tweenLength: false,
        },
        ease: "power3.out",
      });
    };

    const handleEnter = () => scramble(text);
    const handleLeave = () => scramble(text);

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [text]);

  return (
    <li className="relative p-1 overflow-hidden list-none">
      <button
        ref={itemRef}
        onClick={onClick}
        className={`relative z-10 
          px-4 py-2 
          md:px-10 md:py-4 
          flex items-center justify-center font-normal
          cursor-pointer
          ${className}`}
      >
        <span ref={textRef}>{text}</span>
      </button>
    </li>
  );
}

function getTextWidth(text: string, style: CSSStyleDeclaration) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return text.length * 10;
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  return ctx.measureText(text).width;
}
