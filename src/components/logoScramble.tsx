"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export function LogoScramble() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dwiRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const dwiEl = dwiRef.current;
    if (!link || !dwiEl) return;

    dwiEl.style.display = "inline-block";
    dwiEl.style.width = `${Math.max(
      dwiEl.offsetWidth,
      getTextWidth("dev", getComputedStyle(dwiEl))
    )}px`;

    const scramble = (text: string) => {
      gsap.to(dwiEl, {
        duration: 1,
        scrambleText: {
          text,
          chars: "01",
          speed: 0.15,
          revealDelay: 0.15,
          tweenLength: false, 
        },
        ease: "power3.out",
      });
    };

    const handleMouseEnter = () => scramble("dev");
    const handleMouseLeave = () => scramble("dwi");

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href="#"
      className="text-2xl  cursor-pointer select-none hover:no-underline hover:translate-x-0 hover:scale-100 transition-none"
    >
      alfin
      <span ref={dwiRef} className="inline-block">
        dwi
      </span>
    </a>
  );
}

function getTextWidth(text: string, style: CSSStyleDeclaration) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return text.length * 10;
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  return ctx.measureText(text).width;
}
