"use client";

import { ButtonItem } from "@/components/buttonScramble";
import { PhotoCard } from "@/components/imageComponent";
import { InterestWork } from "@/components/interestWork";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { TextReveal } from "@/components/ui/text-reveal";
import { projects } from "@/components/video";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0);

  const paragraphRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.reduce((max, entry) => {
          return entry.intersectionRatio > max.intersectionRatio ? entry : max;
        }, entries[0]);

        if (visibleEntry?.isIntersecting) {
          const index = paragraphRefs.current.findIndex(
            (el) => el === visibleEntry.target
          );
          if (index !== -1) setActiveSection(index);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    paragraphRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const images = [
    "/sekolah1.jpeg",
    "/sekolah.jpeg",
    "/dw1.jpeg",
    "/ngoding.jpeg",
    "/ngoding.jpeg",
  ];
  const years = ["2024", "2024", "2025", "2025", "2025"];
  return (
    <div className="flex bg-[#0a090f]  flex-col">
      <div className="px-10">
        <div
          id="desc-section"
          className="flex flex-col text-white border border-[#6a686d] pt-20 relative"
        >
          <div className="relative  flex flex-col justify-start items-start ">
            <motion.div
              className="relative md:items-baseline px-3"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h1
                className=" leading-[0.95] uppercase font-semibold tracking-tight 
                     text-3xl md:text-5xl lg:text-8xl"
              >
                please
              </h1>
              <h1
                className="leading-[0.95] ml-12 uppercase font-semibold tracking-tight 
                     text-3xl md:text-5xl lg:text-8xl"
              >
                call me Alfin
              </h1>
            </motion.div>
            <div className="relative mx-auto px-10 flex flex-col md:flex-row py-16 justify-center items-center gap-14 w-full">
              <PhotoCard
                label="PHOTO_01101"
                imageSrc="/apingdwi.jpeg"
                width={400}
                height={400}
                className="w-[550px] h-[550px] "
              />

              <div className="relative mt-8 md:mt-0 pl-6 md:pl-14 py-6 md:py-24 order-2 md:order-2 max-w-[550px]">
                <span
                  className="absolute hidden md:block left-0 top-[0.5rem] bottom-[-4rem] w-[1px] bg-[#6a686d]"
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
                  className="leading-relaxed text-gray-200 text-[clamp(1.2rem,2.3vw,1.5rem)] text-center md:text-left"
                >
                  I am a full-stack developer with over a year of experience
                  building scalable and interactive web experiences, giving
                  individuals and teams complete control over their sites.
                </p>

                <div className="flex flex-col md:flex-row gap-6 mt-8 justify-center md:justify-start">
                  <ButtonItem
                    text="Get in touch"
                    size="lg"
                    href="/contact"
                    className="bg-yellow-300 text-black rounded w-full md:w-auto"
                  />
                  <ButtonItem
                    text="See Project"
                    href="/projects"
                    size="lg"
                    className="bg-black border border-white text-white rounded w-full md:w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full flex items-center justify-center">
        <div className="border-t border-b w-full py-2 gap-3">
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent>
              {new Array(10).fill(null).map((_, index) => (
                <MarqueeItem key={index}>
                  <div className="flex justify-center items-center gap-3">
                    <span className="text-xs tracking-widest text-white uppercase">
                      Tech Stack
                    </span>
                    <span className="text-xs tracking-widest text-white uppercase">
                      ////////////////////
                    </span>
                    <span className="text-xs tracking-widest text-white uppercase">
                      TCH_STK_01101
                    </span>
                    <span className="text-xs tracking-widest text-white uppercase">
                      ////////////////////
                    </span>
                  </div>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </div>
      </div>

      <div className="px-10">
        <div className="flex justify-start border border-[#6a686d]">
          <div className="border-l border-r border-b border-[#6a686d] ">
            <div className="sticky top-0 py-20 px-15">
              <p className="absolute top-[450px] left-30 -translate-x-1/2 text-white text-8xl font-bold">
                {years[activeSection]}
              </p>
              <p
                className="absolute -left-10 top-1/2 md:left-10 md:top-90 md:-translate-y-1/2 -rotate-90 origin-left text-[#868a8f] tracking-widest"
                style={{ fontSize: "clamp(8px, 1.5vw, 12px)" }}
              >
                PHOTO_01101
              </p>
              <img
                src={images[activeSection]}
                alt={images[activeSection]}
                className="w-[340px] h-[380px] object-cover rounded"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="max-w-[1000px] h-full overflow-y-auto p-10 space-y-8">
              <TextReveal className="text-2xl font-bold text-white">
                <span
                  ref={(el) => {
                    if (el) paragraphRefs.current[0] = el;
                  }}
                />
                Hi! My name is Alfin Dwi, I live in South Tangerang and am
                currently 19 years old. I have hobbies such as playing games,
                reading books, and watching movies.
                <br />
                <span
                  ref={(el) => {
                    if (el) paragraphRefs.current[1] = el;
                  }}
                />
                I graduated in 2024 from SMK Media Informatika, majoring in
                Software Engineering. During my time at the school, I learned
                programming fundamentals such as HTML, CSS, PHP, Laravel, and
                MySQL.
                <br />
                <span
                  ref={(el) => {
                    if (el) paragraphRefs.current[2] = el;
                  }}
                />
                However, after graduating, I felt I still needed to improve my
                skills to prepare for a career in the tech world. Therefore, I
                took the Fullstack Developer Bootcamp course at Dumbways for
                four months. There, I learned various modern technologies such
                as: TypeScript, JavaScript, React.js, Node.js, Express.js, Java,
                Spring Boot, Git, Socket.IO, Midtrans, Chakra UI, and Tailwind
                CSS. During the bootcamp, I successfully completed four
                portfolio projects: CircleApp, Alflix, DumbMerch, and WaysBeans.
                <br />
                Besides Bootcamps, I also actively study independently by
                creating small mini-projects to strengthen my understanding. I'm
                interested in the world of technology because I believe it can
                solve many problems in everyday life and create new
                opportunities.
                <span
                  ref={(el) => {
                    if (el) paragraphRefs.current[3] = el;
                  }}
                />
                <br />
                My goal for the future is to become a software engineer who is
                not only able to create functional applications, but also those
                that deliver a good user experience, fast performance, and clean
                code. I also want to continue learning and contributing to the
                technology community.
                <span
                  ref={(el) => {
                    if (el) paragraphRefs.current[4] = el;
                  }}
                />
              </TextReveal>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10">
        <InterestWork />
      </div>
    </div>
  );
}
