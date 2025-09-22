"use client";

import { ButtonItem } from "@/components/buttonScramble";
import { InterestWork } from "@/components/interestWork";
import { projects } from "@/components/video";

export default function Projects() {
  return (
    <div className="flex bg-[#0a090f]  flex-col">
      <div className="px-10">
        <div className="flex border-t border py-10 border-[#6a686d] max-w-full overflow-hidden">
          <div className="flex-1 p-10 flex  items-center">
            <p className="text-5xl md:text-8xl text-white uppercase font-medium">
              selected my project
            </p>
          </div>

          <div className="flex-1 p-10 flex justify-center items-center">
            <div className="relative mt-2 md:mt-10 pl-4 md:pl-10 py-3 md:py-15 order-2 md:order-2">
              <span
                className="absolute hidden md:block left-0 top-[0.5rem] bottom-0 w-[1px] bg-[#6a686d]"
                id="border-l"
              />

              <span
                className="absolute bottom-0 left-0 h-[2px] w-full bg-white"
                id="border-b"
              ></span>

              <span
                id="star"
                className="absolute -left-3 -bottom-3 bg-[#0a090f] px-1 text-white text-lg"
              >
                ✦
              </span>

              <p
                id="desc-text"
                className="leading-relaxed text-gray-200 max-w-md text-[clamp(1rem,2vw,1.25rem)]"
              >
                A glimpse of some of the projects I've worked on, from
                migrations and scalable websites to immersive web experiences.
              </p>

              <div className="flex flex-col md:flex-row gap-4 mt-6">
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
            <div className="p-5 md:p-10 border border-[#6a686d]">
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

              <p className="text-2xl text-white py-3 font-semibold">{project.title}</p>
            </div>
          ))}
        </div>

        <InterestWork />
      </div>
    </div>
  );
}
