"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WelcomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
      .fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .to(containerRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1.5, // tunggu sebentar sebelum fade out
        onComplete: () => {
          window.location.href = "/dashboard"; // redirect ke halaman utama
        },
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center min-h-screen bg-black text-white"
    >
      <h1 ref={textRef} className="text-4xl font-bold">
        Selamat Datang 🚀
      </h1>
    </div>
  );
}
