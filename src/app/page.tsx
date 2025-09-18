"use client";

import { ButtonItem } from "@/components/buttonScramble";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Video } from "@/components/video";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechLogo } from "@/components/techLogo";

export default function WelcomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hiTextRef = useRef<HTMLParagraphElement>(null);
  const fullstackDesktopRef = useRef<HTMLHeadingElement>(null);
  const fullstackMobileRef = useRef<HTMLHeadingElement>(null);
  const developerDesktopRef = useRef<HTMLHeadingElement>(null);
  const developerMobileRef = useRef<HTMLHeadingElement>(null);

  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current || !videoRef.current) return;

    ScrollTrigger.create({
      trigger: videoRef.current,
      start: "top top-=5",
      end: "bottom bottom-=70",
      scrub: true,
      onEnter: () => {
        gsap.to(mainRef.current, {
          backgroundColor: "#344CB7",
          duration: 1,
          ease: "power2.inOut",
        });
      },
      onLeaveBack: () => {
        gsap.to(mainRef.current, {
          backgroundColor: "#0a090f",
          duration: 1,
          ease: "power2.inOut",
        });
      },
    });

    ScrollTrigger.create({
      trigger: "#tech-logo-section",
      start: "top bottom",
      end: "top top",
      scrub: true,
      onEnter: () => {
        gsap.to(mainRef.current, {
          backgroundColor: "#0a090f",
          duration: 1,
          ease: "power2.inOut",
        });
      },
      onLeaveBack: () => {
        gsap.to(mainRef.current, {
          backgroundColor: "#344CB7",
          duration: 1,
          ease: "power2.inOut",
        });
      },
    });
  }, []);

  useEffect(() => {
    if (
      !overlayRef.current ||
      !hiTextRef.current ||
      !fullstackDesktopRef.current ||
      !developerDesktopRef.current ||
      !fullstackMobileRef ||
      !developerMobileRef ||
      !descRef.current
    )
      return;

    const borderL = descRef.current.querySelector<HTMLSpanElement>("#border-l");
    const star = descRef.current.querySelector<HTMLSpanElement>("#star");
    const borderT = descRef.current.querySelector<HTMLSpanElement>("#border-t");
    const descText =
      descRef.current.querySelector<HTMLParagraphElement>("#desc-text");

    gsap.set(overlayRef.current, { opacity: 1, pointerEvents: "auto" });
    gsap.set(
      [
        fullstackDesktopRef.current,
        fullstackMobileRef.current,
        developerDesktopRef.current,
        developerMobileRef.current,
      ],
      { x: -100, opacity: 0 }
    );

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

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          gsap.set(overlayRef.current, {
            pointerEvents: "none",
            display: "none",
          });

          const nav = document.querySelector("nav");
          if (nav) {
            gsap.fromTo(
              nav,
              { y: "-150%", opacity: 0 },
              { y: "0%", opacity: 1, duration: 0.8, ease: "power4.out" }
            );
          }
        },
      },
      "+=0.3"
    );

    tl.set(hiTextRef.current, { zIndex: 10 });

    tl.to(
      [fullstackDesktopRef.current, fullstackMobileRef.current],
      { x: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );

    tl.to(
      [developerDesktopRef.current, developerMobileRef.current],
      { x: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );

    tl.to(borderL, { scaleY: 1, duration: 0.6 }, "-=0.6");
    tl.to(borderT, { scaleX: 1, duration: 0.6 }, "-=0.4");

    tl.to(star, { opacity: 1, duration: 0.6 }, "-=0.7");

    tl.to(descText, { y: 0, opacity: 1, duration: 1 }, "-=0.4");
  }, []);

  return (
    <main ref={mainRef} className="flex bg-[#0a090f]  flex-col ">
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-screen h-screen bg-[#0a090f] z-50 flex"
      ></div>

      <div className="px-10">
        <div
          id="desc-section"
          className="flex flex-col  text-white  justify-center border border-[#6a686d] py-15 relative"
        >
          <div className="max-w-7xl mx-auto ">
            <div className="relative flex flex-col items-center justify-center py-10">
              <div className="relative flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4">
                <p
                  ref={hiTextRef}
                  className="text-2xl sm:text-2xl md:text-3xl order-1 md:order-none text-center md:text-left relative z-[55]"
                ></p>

                <h1
                  ref={fullstackDesktopRef}
                  className="hidden md:block leading-[0.95] uppercase font-semibold tracking-tight 
              text-3xl md:text-5xl lg:text-7xl"
                >
                  Fullstack
                </h1>
              </div>

              <div className="flex flex-col items-center md:hidden gap-2 mt-2">
                <h1
                  ref={fullstackMobileRef}
                  className="leading-[0.95] ml-5 uppercase font-semibold tracking-tight text-[clamp(2.5rem,6vw,2.5rem)]"
                >
                  Fullstack
                </h1>
                <h1
                  ref={developerMobileRef}
                  className="leading-[0.95] mr-5 uppercase font-semibold tracking-tight text-[clamp(2.3rem,5vw,2.2rem)]"
                >
                  De<span className="italic mr-2">V</span>eloper
                </h1>
              </div>

              <div className="hidden md:block">
                <h1
                  ref={developerDesktopRef}
                  className="leading-[0.95] uppercase font-semibold tracking-tight 
              text-2xl md:text-5xl lg:text-7xl"
                >
                  Developer
                </h1>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between px-4 md:px-15 gap-10 md:gap-8">
              <div className="relative w-full md:w-[500px] h-[300px] md:h-[500px] order-1 md:order-1">
                <p
                  className="absolute left-[-8px] sm:left-[-15px] md:left-[-10px] lg:left-[-15px] 
              top-60 sm:top-110 md:top-80 lg:md:top-110 
              -translate-y-1/2 -rotate-90 origin-left text-[#868a8f] tracking-widest"
                  style={{ fontSize: "clamp(8px, 1.5vw, 12px)" }}
                >
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
                className="relative mt-2 md:mt-10 pl-4 md:pl-10 py-3 md:py-20 order-2 md:order-2"
              >
                <span
                  className="absolute hidden md:block left-0 top-[0.5rem] bottom-[-3.7rem] w-[1px] bg-[#6a686d]"
                  id="border-l"
                />

                <span
                  className="absolute top-0 left-0 h-[2px] w-full bg-white"
                  id="border-t"
                ></span>

                <span
                  id="star"
                  className="absolute -left-3 -top-3.5 bg-[#0a090f] px-1 text-white text-lg"
                >
                  ✦
                </span>

                <p
                  id="desc-text"
                  className="leading-relaxed text-gray-200 max-w-md text-[clamp(1rem,2vw,1.25rem)]"
                >
                  I created the website from scratch — from the visuals, to the
                  user interactions, to the backend systems that support it,
                  ensuring a seamless experience and scalable performance.
                </p>

                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <ButtonItem
                    text="Get in touch"
                    size="lg"
                    className="bg-[#FFB823] text-black rounded w-full md:w-auto"
                  />
                  <ButtonItem
                    text="See Expirement"
                    size="lg"
                    className="bg-black border border-white text-white rounded w-full md:w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={videoRef} className="w-full">
        <Video />
      </div>

      <div id="tech-logo-section" className="w-full mt-5">
        <TechLogo />
      </div>
    </main>
  );
}
