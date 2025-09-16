"use client";

import { ButtonItem } from "@/components/buttonScramble";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function WelcomePage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hiTextRef = useRef<HTMLParagraphElement>(null);
  const fullstackRef = useRef<HTMLHeadingElement>(null);
  const developerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !overlayRef.current ||
      !hiTextRef.current ||
      !fullstackRef.current ||
      !developerRef.current ||
      !descRef.current
    )
      return;

    const borderL = descRef.current.querySelector<HTMLSpanElement>("#border-l");
    const star = descRef.current.querySelector<HTMLSpanElement>("#star");
    const borderT = descRef.current.querySelector<HTMLSpanElement>("#border-t");
    const descText =
      descRef.current.querySelector<HTMLParagraphElement>("#desc-text");

    gsap.set(overlayRef.current, { opacity: 1, pointerEvents: "auto" });
    gsap.set([fullstackRef.current, developerRef.current], {
      x: -100,
      opacity: 0,
    });

    gsap.set(borderL, { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(borderT, { scaleX: 0, transformOrigin: "left" });

    gsap.set(star, { opacity: 0 });
    gsap.set(descText, { y: 50, opacity: 0 });

    const baseText = "Hi, I'm ";
    const scrambleText = "Alfin Dwi";
    hiTextRef.current.innerHTML = `${baseText}<span id="scramble-span">${scrambleText}</span>`;
    const scrambleEl =
      hiTextRef.current.querySelector<HTMLSpanElement>("#scramble-span");
    if (!scrambleEl) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      scrambleEl,
      { textContent: "" },
      {
        duration: 1.5,
        scrambleText: {
          text: scrambleText,
          chars: "01",
          speed: 0.3,
          revealDelay: 0.1,
        },
      }
    );

    tl.to(overlayRef.current, { opacity: 0, duration: 1 }, "+=0.3").set(
      overlayRef.current,
      { pointerEvents: "none" }
    );

    tl.to(fullstackRef.current, { x: 0, opacity: 1, duration: 1 }, "-=0.8");
    tl.to(developerRef.current, { x: 0, opacity: 1, duration: 1 }, "-=0.8");

    tl.to(borderL, { scaleY: 1, duration: 0.6 }, "-=0.6");
    tl.to(borderT, { scaleX: 1, duration: 0.6 }, "-=0.4");

    tl.to(star, { opacity: 1, duration: 0.6 }, "-=0.7");

    tl.to(descText, { y: 0, opacity: 1, duration: 1 }, "-=0.4");
  }, []);

  return (
    <main className="flex bg-[#0a090f] px-10 flex-col min-h-screen">
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-screen h-screen bg-[#0a090f] z-50 flex"
      ></div>

      <div className="flex flex-col text-white justify-center border border-[#6a686d] py-15 relative">
        <div className="relative flex flex-col items-center justify-center py-10">
          <div className="relative flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4">
            <p
              ref={hiTextRef}
              className="text-2xl sm:text-2xl md:text-3xl order-1 md:order-none text-center md:text-left relative z-[60]"
            ></p>

            <h1
              ref={fullstackRef}
              className="hidden md:block leading-[0.95] uppercase font-semibold tracking-tight 
              text-3xl md:text-5xl lg:text-7xl"
            >
              Fullstack
            </h1>
          </div>

          <div className="hidden md:block">
            <h1
              ref={developerRef}
              className="leading-[0.95] uppercase font-semibold tracking-tight 
              text-2xl md:text-5xl lg:text-7xl"
            >
              De<span className="italic mr-5">V</span>eloper
            </h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between px-4 md:px-15 gap-10 md:gap-8">
          <div className="relative w-full md:w-[500px] h-[300px] md:h-[500px] order-1 md:order-1">
            <p className="absolute left-[-5px] md:left-[-15px] top-65 md:top-110 text-[10px] -translate-y-1/2 -rotate-90 origin-left text-[#868a8f] tracking-widest">
              PHOTO_01101
            </p>

            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
            >
              <clipPath id="clip2">
                <polygon points="0,0 380,0 400,20 400,400 30,400 0,355" />
              </clipPath>

              <image
                href={"/apin3.jpeg"}
                width="400"
                height="400"
                clipPath="url(#clip2)"
                preserveAspectRatio="xMidYMid slice"
              />

              <polygon
                points="0,0 380,0 400,20 400,400 30,400 0,355"
                stroke="white"
                fill="none"
                strokeWidth="1"
              />
            </svg>
          </div>
            
          <div
            ref={descRef}
            className="relative mt-2 md:mt-10 h-auto pl-4 md:pl-10 py-3 md:py-20 order-2 md:order-2"
          >
            <span
              className="absolute left-0 top-0 h-full w-[2px] bg-[#6a686d]"
              id="border-l"
            ></span>
            <span
              className="absolute top-0 left-0 h-[2px] w-full bg-white"
              id="border-t"
            ></span>

            <span id="star" className="absolute -left-3 -top-3.5 bg-[#0a090f] px-1 text-white text-lg">
              ✦
            </span>

            <p
              className="text-2xl leading-relaxed text-gray-200 max-w-md"
              id="desc-text"
            >
              I created the website from scratch — from the visuals, to the user
              interactions, to the backend systems that support it, ensuring a
              seamless experience and scalable performance.
            </p>

            <div className="flex gap-4 mt-6">
              <ButtonItem
                text="Get in touch"
                className="bg-[#FFB823] text-black rounded"
              />
              <ButtonItem
                text="See Expirement"
                className="bg-black border border-white text-white rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
