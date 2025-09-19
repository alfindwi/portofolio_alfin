"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import {
  SiChakraui,
  SiExpress,
  SiGit,
  SiHibernate,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSocketdotio,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import LogoLoop from "./LogoLoop";

gsap.registerPlugin(ScrambleTextPlugin);

const imageLogos = [
  {
    node: <SiReact className="text-white" />,
    alt: "React",
  },
  {
    node: <SiSpringboot className="text-white" />,
    alt: "Java SpringBoot",
  },
  {
    node: <SiTailwindcss className="text-white" />,
    alt: "Tailwindcss",
  },
  {
    node: <SiMysql className="text-white" />,
    alt: "Mysql",
  },
  {
    node: <SiLaravel className="text-white" />,
    alt: "Laravel",
  },
  {
    node: <SiPostgresql className="text-white" />,
    alt: "PostgreSQL",
  },
  {
    node: <SiSocketdotio className="text-white" />,
    alt: "Socket IO",
  },
  {
    node: <SiExpress className="text-white" />,
    alt: "Express JS",
  },
  {
    node: <SiHibernate className="text-white" />,
    alt: "Hibernate",
  },
  {
    node: <SiGit className="text-white" />,
    alt: "Git",
  },
  {
    node: <SiJavascript className="text-white" />,
    alt: "Javascript",
  },
  {
    node: <SiTypescript className="text-white" />,
    alt: "Typescript",
  },
  {
    node: <SiPhp className="text-white" />,
    alt: "PHP",
  },
];

export function TechLogo() {
  return (
    <section className="relative w-full bg-[#0a090f] mt-10">
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

      <div className="flex items-center justify-center h-[200px]">
        <LogoLoop
          logos={imageLogos}
          speed={100}
          direction="left"
          logoHeight={70}
          gap={80}
          pauseOnHover
          scaleOnHover
          ariaLabel="Technology partners"
        />
      </div>

      <div className="relative w-full flex items-center justify-center">
        <div className="border-t border-b w-full py-2 gap-3">
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent>
              {new Array(10).fill(null).map((_, index) => (
                <MarqueeItem key={`bottom-${index}`}>
                  <div className="flex justify-center items-center gap-3">
                    <span className="text-xs tracking-widest text-white uppercase">
                      Tech Stack
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
    </section>
  );
}
