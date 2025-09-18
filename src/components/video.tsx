"use client";
import { ButtonItem } from "./buttonScramble";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextScramble } from "./textScramble";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  videoSrc: string;
  title: string;
  description: string;
};

const projects: Project[] = [
  {
    id: 1,
    videoSrc: "/video.mp4",
    title: "Alflix",
    description:
      "A movie and series streaming platform with a modern interface for a comfortable",
  },
  {
    id: 2,
    videoSrc: "/video2.mp4",
    title: "Portfolio",
    description:
      "A personal portfolio website showcasing interactive UI design and smooth animations.",
  },
  {
    id: 3,
    videoSrc: "/video3.mp4",
    title: "E-commerce",
    description:
      "A modern e-commerce app with optimized checkout and responsive design.",
  },
  {
    id: 4,
    videoSrc: "/video4.mp4",
    title: "Mukbang",
    description:
      "A modern e-commerce app with optimized checkout and responsive design.",
  },
];

export function Video() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = projects.map((_, i) => {
      return ScrollTrigger.create({
        trigger: containerRef.current,
        start: () => `top -${i * window.innerHeight}`,
        end: () => `+=${window.innerHeight}`,
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

    return () => {
      sections.forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [activeIndex]);

  useEffect(() => {
    if (!videoWrapperRef.current) return;

    const videos = videoWrapperRef.current.querySelectorAll("video");

    videos.forEach((v, i) => {
      if (i === activeIndex) {
        gsap.to(v, {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        });
      } else {
        gsap.to(v, {
          autoAlpha: 0,
          scale: 1.05,
          duration: 1,
          ease: "power3.out",
        });
      }
    });
  }, [activeIndex]);

  const proj = projects[activeIndex];

  return (
    <div ref={containerRef} className="relative w-full h-[450vh] px-10">
      <div className="sticky top-0 h-screen ">
        <div
          ref={cardRef}
          key={proj.id}
          className="video-card relative w-full h-[100vh] flex justify-center items-center sm:mt-20"
        >
          <p
            className="absolute left-[-10px] sm:left-[-15px] md:left-[-10px] lg:left-[-15px] 
              top-107 sm:top-110 lg:md:top-100 
              -translate-y-1/2 -rotate-90 origin-left text-white tracking-widest"
            style={{ fontSize: "clamp(10px, 1.5vw, 12px)" }}
          >
            PROJECT_000{proj.id}
          </p>

          <video
            key={proj.videoSrc}
            autoPlay
            muted
            loop
            className="w-full h-[25vh] sm:h-full object-cover rounded-sm mx-auto"
          >
            <source src={proj.videoSrc} type="video/mp4" />
          </video>

          <div
            className="absolute bottom-10 sm:left-10 max-w-sm
                       bg-black/60 rounded-md shadow-lg text-white transition-all duration-500"
          >
            <div className="p-4 max-w-[42vh] sm:max-w-[600px]">
              <TextScramble
                text={proj.title}
                className="text-3xl font-bold flex flex-col"
              />
              <TextScramble
                text={proj.description}
                className="mt-2 text-sm text-gray-200 leading-relaxed"
              />

              <div className="flex gap-4 mt-4">
                <div className="flex gap-2 w-full sm:hidden">
                  <ButtonItem
                    text="View Case Study"
                    size="sm"
                    className="bg-yellow-400 text-black w-full"
                  />
                  <ButtonItem
                    text="See all work"
                    size="sm"
                    className="bg-black/70 border border-white text-white w-full"
                  />
                </div>

                <div className="hidden sm:flex gap-4">
                  <ButtonItem
                    text="View Case Study"
                    size="md"
                    className="bg-yellow-400 text-black"
                  />
                  <ButtonItem
                    text="See all work"
                    size="md"
                    className="bg-black/70 border border-white text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
