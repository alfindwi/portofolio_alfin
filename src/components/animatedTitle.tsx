"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedTitle() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const letters = textRef.current.querySelectorAll("span");

    gsap.fromTo(
      letters,
      {
        x: -50,
        opacity: 0,
        skewX: -10,
      },
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        ease: "back.out(1.7)", 
        duration: 0.8,
        stagger: 0.05, 
      }
    );
  }, []);

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-white overflow-hidden">
      {"Fullstack Developer".split("").map((letter, index) => (
        <span key={index} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h1>
  );
}
