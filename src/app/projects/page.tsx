"use client";

import { ButtonItem } from "@/components/buttonScramble";
import { InterestWork } from "@/components/interestWork";
import { projects } from "@/components/video";

export default function Projects() {
  return (
    <div className="flex bg-[#0a090f]  flex-col">
      <div className="px-10 ">
        <div className="flex border-t border border-[#6a686d] py-5 pt-25 md:py-20 flex-col md:flex-row max-w-full overflow-hidden">
          <div className="flex-1 px-6 md:px-10 flex md:justify-start">
            <p className="text-5xl md:text-8xl text-center md:text-left text-white uppercase font-bold">
              Selected My Project
            </p>
          </div>

          <div className="flex-1 px-6 md:px-10 flex justify-center items-center mt-6 md:mt-0">
            <div className="relative w-full md:p-10 flex flex-col items-center md:items-start">
              <span className="block h-[2px] w-full bg-white mb-4 md:absolute md:bottom-0 md:left-0 md:mb-0" />

              <span className="hidden md:block absolute left-0 top-[0.5rem] bottom-0 w-[1px] bg-[#6a686d]" />

              <span className="absolute -left-3 -top-3 md:-bottom-3 md:top-auto bg-[#0a090f] px-1 text-white text-lg">
                ✦
              </span>

              <p className="leading-relaxed text-gray-200 text-center md:text-left max-w-full md:max-w-md text-[clamp(1rem,2vw,1.25rem)]">
                A glimpse of some of the projects I've worked on, from
                migrations and scalable websites to immersive web experiences.
              </p>

              <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:w-auto">
                <ButtonItem
                  text="Get in touch"
                  size="lg"
                  href="/contact"
                  className="bg-yellow-300 text-black rounded w-full md:w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {projects.map((project, i) => (
            <div key={project.id ?? i}  className="p-5 md:p-10 border border-[#6a686d]">
              <p className="text-[10px] text-white p-2">PROJECT_000{i + 1}</p>

              <div className="relative">
                <video
                  src={project.videoSrc}
                  className="rounded-sm w-full h-50"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute bottom-0 flex items-center justify-center">
                  <ButtonItem
                    text="View Case Study"
                    href={`/projects/${project.title}`}
                    className="bg-gray-600/80 text-white px-5 py-2 rounded-sm text-sm"
                  />
                </div>
              </div>

              <p className="text-2xl text-white py-3 font-semibold">
                {project.title}
              </p>
            </div>
          ))}
        </div>

        <InterestWork />
      </div>
    </div>
  );
}
