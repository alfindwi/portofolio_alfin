"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  chars?: string;
  animateOnHover?: boolean;
}

export function HyperText({
  children,
  className,
  duration = 10,
  chars = "01",
  animateOnHover = true,
}: HyperTextProps) {
  const MotionComponent = motion.create("div", { forwardMotionProps: true });
  const textRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const scramble = () => {
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      duration,
      scrambleText: {
        text: children,
        chars,
        speed: 0.10,
      },
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    if (animateOnHover && !hasAnimated) {
      scramble();
      setHasAnimated(true);
    }
  };

  const handleMouseLeave = () => {
    if (animateOnHover) {
      scramble();
      setHasAnimated(false);
    }
  };

  return (
    <MotionComponent
      ref={textRef}
      className={cn("font-mono text-4xl font-bold", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </MotionComponent>
  );
}
