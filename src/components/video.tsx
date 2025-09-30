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
  video?: string;
  title: string;
  slug: string;
  challenge: string;
  solution: string;
  description: string;
  date: string;
  techStack: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    videoSrc: "/video.mp4",
    video: "/video.mp4",
    title: "Alflix",
    slug: "alflix",
    description:
      "A movie and series streaming platform with a modern interface for a comfortable",
    date: "August - September 2025",
    challenge:
      "Create a smooth streaming system without excessive buffering and a UI that remains lightweight.",
    solution:
      "Using lazy loading videos, Cloud for file distribution, and React-based UI design for optimal performance.",
    techStack: [
      "React Js",
      "Chakra UI",
      "Redux",
      "Java SpringBoot",
      "Hibernate",
      "Midtrans",
      "Cloudinary",
      "PostgreSQL",
    ],
  },
  {
    id: 2,
    videoSrc: "/video1_portofolio2.webm",
    video: "/video2_portofolio2.webm",
    title: "Circle App",
    slug: "circle-app",
    description:
      "web-based social media that allows users posts, images, and likes, replies, and follows in real-time.",
    date: "August - September 2024",
    challenge:
      "designing a lightweight yet interactive system like modern social media, including state management, user authentication, and rendering performance when displaying a list of threads",
    solution:
      "designing a structured architecture, optimizing the way data is displayed to remain fast despite the large number of threads, and presenting a simple and interactive interface so that users can interact smoothly.",
    techStack: [
      "React Js",
      "Node Js",
      "Express Js",
      "Cloudinary",
      "PostgreSQL",
      "Chakra UI",
      "Redux",
      "Typescript",
    ],
  },
  {
    id: 3,
    videoSrc: "/video1_portofolio3.webm",
    video: "/video2_portofolio3.webm",
    title: "DumbMerch",
    slug: "dumbmerch",
    description:
      "An e-commerce app for selling merchandise with catalog, cart, and checkout.",
    date: "October - November 2024",
    challenge:
      "building an easy-to-use e-commerce system, from product management to efficient transaction processes.",
    solution:
      "design a simple shopping flow, display a structured product catalog, and ensure the checkout process is fast and easy for users to understand.",
    techStack: [
      "React Js",
      "Node Js",
      "Express Js",
      "Cloudinary",
      "PostgreSQL",
      "Chakra UI",
      "Redux",
      "Typescript",
      "Socket IO",
      "Midtrans",
    ],
  },
  {
    id: 4,
    videoSrc: "video1_portofolio4.webm",
    video: "video1_portofolio4.webm",
    title: "WaysBeans",
    slug: "waysbeans",
    description:
      "A simple e-commerce app for selling coffee beans with catalog, cart, and checkout.",
    date: "Built in 1 day",
    challenge:
      "Completed a simple e-commerce application in a very short time, with the main challenge being getting core features like catalog, shopping cart, and checkout to work properly.",
    solution:
      "Focus on the most important core features, design a concise shopping flow, and keep the design simple so that the application can be completed in 1 day while still providing a decent shopping experience.",
    techStack: [
      "React Js",
      "Node Js",
      "Express Js",
      "Cloudinary",
      "PostgreSQL",
      "Chakra UI",
      "Redux",
      "Typescript",
      "Midtrans",
    ],
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
            className="absolute left-[-15px] sm:left-[-15px] md:left-[-10px] lg:left-[-15px] 
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
                    href={`/projects/${proj.slug}`}
                    className="bg-yellow-300 text-black w-full"
                  />
                  <ButtonItem
                    text="See all Project"
                    size="sm"
                    href="/projects"
                    className="bg-black/70 border border-white text-white w-full"
                  />
                </div>

                <div className="hidden sm:flex gap-4">
                  <ButtonItem
                    text="View Case Study"
                    size="md"
                    href={`/projects/${proj.slug}`}
                    className="bg-yellow-300 text-black"
                  />
                  <ButtonItem
                    text="See all project"
                    size="md"
                    href="/projects"
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
