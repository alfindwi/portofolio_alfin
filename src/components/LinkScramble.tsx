"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

type NavItemProps = {
  text: string;
};

export function NavItem({ text }: NavItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    const txtEl = textRef.current;
    if (!el || !txtEl) return;

    txtEl.style.display = "inline-block";
    txtEl.style.width = `${getTextWidth(text, getComputedStyle(txtEl))}px`;

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

    const handleEnter = () => scramble(text.toUpperCase());
    const handleLeave = () => scramble(text); 

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [text]);

  return (
    <li className="relative p-2 overflow-hidden">
      <a
        ref={itemRef}
        href="#"
        className="relative z-10 block px-3 py-1 font-grotesk font-bold text-sm cursor-pointer"
      >
        <span ref={textRef}>{text}</span>
      </a>
      <div className="absolute inset-0 rounded-sm z-0" />
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
