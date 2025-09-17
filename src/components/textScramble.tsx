import { useEffect, useRef } from "react";
import gsap from "gsap";

export function TextScramble({ text, className }: { text: string; className?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { textContent: "" },
        {
          scrambleText: {
            text,
            chars: "01",
            speed: 0.3,
            revealDelay: 0.1,
          },
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, [text]);

  return <span ref={textRef} className={className}></span>;
}
