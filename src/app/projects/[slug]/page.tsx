"use client";

import { ButtonItem } from "@/components/buttonScramble";
import { InterestWork } from "@/components/interestWork";
import { projects } from "@/components/video";
import { MoveUpRight } from "lucide-react";

export default function ProjectSlug({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  return (
    <div className="flex bg-[#0a090f]  flex-col">
      <div className="px-5 md:px-10">
        <div className="flex border-t border border-[#6a686d] py-5 pt-25 md:py-20 flex-col md:flex-row max-w-full overflow-hidden">
          <div className="flex-1 px-6 md:px-10 flex md:justify-start">
            <p className="text-5xl md:text-8xl text-center md:text-left text-white uppercase font-bold">
              {project?.title}
            </p>
          </div>

          <div className="flex-1 px-6 md:px-10 flex justify-center items-center mt-6 md:mt-0">
            <div className="relative w-full md:p-10 flex flex-col items-center md:items-start">
              <span className="block h-[2px] w-full bg-white mb-4 md:absolute md:bottom-0 md:left-0 md:mb-0" />

              <span className="hidden md:block absolute left-0 top-[0.5rem] bottom-0 w-[1px] bg-[#6a686d]" />

              <span className="absolute -left-3 -top-3 md:-bottom-3 md:top-auto bg-[#0a090f] px-1 text-white text-lg">
                ✦
              </span>

              <p className="leading-relaxed text-gray-200 md:text-left max-w-full md:max-w-md text-[clamp(1rem,2vw,1.25rem)]">
                {project?.description}
              </p>

              <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:w-auto">
                <ButtonItem
                  text="Get in touch"
                  size="lg"
                  href="/contact"
                  className="bg-yellow-300 text-black rounded-sm w-full md:w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative">
          <p
            className="absolute text-[#868a8f] -left-11 top-18 md:-left-15 md:top-90 md:-translate-y-1/2  -rotate-90"
            style={{ fontSize: "clamp(8px, 1.5vw, 10px)" }}
          >
            {`VIDEO_SRC_0001`}
          </p>
          <video
            src={project?.videoSrc}
            autoPlay
            loop
            muted
            className="w-full rounded-lg"
          />

          <div className="border-l border-b border-[#6a686d] grid grid-cols-1 md:grid-cols-2">
            <div className=" md:border-b-0 md:border-r border-[#6a686d] p-6 flex flex-col justify-center text-white">
              <span className="uppercase text-[12px] tracking-widest text-gray-400">
                Roles
              </span>
              <p className="text-[clamp(1rem,2vw,1.25rem)]">
                Fullstack Development
              </p>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between text-white gap-4">
              <div className="flex flex-col">
                <span className="uppercase text-[12px] tracking-widest text-gray-400">
                  Date
                </span>
                <p className="text-[clamp(1rem,2vw,1.25rem)]">
                  {project?.date}
                </p>
              </div>

              <ButtonItem
                text="View Website"
                size="md"
                href="/projects"
                className="border border-[#6a686d] self-start md:self-auto"
              >
                <MoveUpRight className="ml-5 w-6 h-6" />
              </ButtonItem>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[700px] relative border-l border-r border-[#6a686d] px-5 py-10 md:px-10 md:py-15 flex flex-col justify-center text-white">
          <span className="uppercase text-[12px] tracking-widest text-gray-400">
            Tech Stack
          </span>
          <p className="text-[clamp(1rem,2vw,1.25rem)]">
            {project?.techStack.join(", ")}
          </p>
        </div>

        <div className="w-full relative">
          <p
            className="absolute text-[#868a8f] -left-17 top-55 md:-left-15 md:top-90 md:-translate-y-1/2  -rotate-90"
            style={{ fontSize: "clamp(8px, 1.5vw, 10px)" }}
          >
            {`VIDEO_SRC_0002`}
          </p>
          <video
            src={project?.videoSrc}
            autoPlay
            loop
            muted
            className="w-full rounded-lg"
          />

          <div className="border-l border-b border-[#6a686d] grid grid-cols-1 md:grid-cols-2">
            <div className="md:border-b-0 md:border-r border-[#6a686d] p-8 flex flex-col justify-center text-white">
              <span className="uppercase text-[12px] tracking-widest text-gray-400">
                the challenge
              </span>
              <p className="text-[clamp(1rem,2vw,1.25rem)]">
                {project?.challenge}
              </p>
            </div>

            <div className="p-8 flex flex-col justify-center text-white">
              <span className="uppercase text-[12px] tracking-widest text-gray-400">
                the solutions
              </span>
              <p className="text-[clamp(1rem,2vw,1.25rem)]">
                {project?.solution}
              </p>
            </div>
          </div>
        </div>

        <InterestWork />
      </div>
    </div>
  );
}
