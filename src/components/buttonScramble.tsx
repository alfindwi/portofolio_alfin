"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

type ButtonSize = "sm" | "md" | "lg";

type ButtonItemProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  size?: ButtonSize;
};

export function ButtonItem({
  text,
  onClick,
  className = "",
  size = "md",
}: ButtonItemProps) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    const txtEl = textRef.current;
    if (!el || !txtEl) return;

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

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const handleHover = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <li className="relative p-1 overflow-hidden list-none">
      <audio ref={audioRef} src="/scramble.mp3" preload="auto" />

      <button
        ref={itemRef}
        onClick={onClick}
        onMouseEnter={handleHover}
        className={`relative z-10 flex items-center justify-center 
          font-normal cursor-pointer rounded-md
          ${sizeClasses[size]} ${className}`}
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
