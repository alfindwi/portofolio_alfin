"use client";

import { useEffect, useState } from "react";
import { NavItem } from "./LinkScramble";
import { LogoScramble } from "./logoScramble";
import { TextScramble } from "./textScramble";

const footerLinks = [
  {
    title: "OVERVIEW",
    items: [
      { id: "[01]", label: "PROJECTS", href: "/projects" },
      { id: "[02]", label: "ABOUT", href: "/about" },
      { id: "[03]", label: "CONTACT", href: "/contact" },
    ],
  },
  {
    title: "CASE STUDIES",
    items: [
      { id: "[04]", label: "ALFLIX", href: "/work/alflix" },
      { id: "[05]", label: "CIRCLE", href: "/work/circle" },
      { id: "[06]", label: "DUMBMERCH", href: "/work/dumbmerch" },
    ],
  },
  {
    title: "CONNECT",
    items: [
      {
        id: "[07]",
        label: "LINKEDIN",
        href: "https://www.linkedin.com/in/alfin-dwi-wadani",
      },
      {
        id: "[08]",
        label: "INSTAGRAM",
        href: "https://www.instagram.com/alvindvvi",
      },
      { id: "[09]", label: "TWITTER", href: "https://x.com/alvindvvi" },
    ],
  },
];

export function Footer() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="border-t border-l border-r border-[#6a686d] px-4 md:px-8 bg-[#0a090f]">
      <div className="flex flex-col md:flex-row text-white justify-between items-start md:items-center py-6 gap-3">
        <LogoScramble />
        <div className="flex items-center gap-3">
          <p className="text-sm md:text-md uppercase tracking-widest text-white flex items-center gap-1">
            Fullstack Developer
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 border-t border-b border-[#6a686d] py-8">
        {footerLinks.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <h2 className="text-white font-medium tracking-wider text-sm md:text-md">
              {section.title}
            </h2>
            <ul className="space-y-2 text-white text-sm">
              {section.items.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <p className="text-[10px] tracking-widest text-[#6a686d] min-w-[20px]">
                    {item.id}
                  </p>
                  <NavItem
                    href={item.href}
                    text={item.label}
                    className="relative z-10 block font-grotesk text-sm cursor-pointer"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-2 md:gap-10 text-white justify-between items-start md:items-center py-6">
        <p className="text-xs md:text-sm text-gray-400">
          © 2025 Alfin Dwi Wadani
        </p>
        <p className="text-xs md:text-sm font-medium">{time}</p>
      </div>
    </footer>
  );
}
