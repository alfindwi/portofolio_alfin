"use client";

import { useEffect, useState } from "react";
import { NavItem } from "./LinkScramble";
import { LogoScramble } from "./logoScramble";
import { TextScramble } from "./textScramble";

const footerLinks = [
  {
    title: "OVERVIEW",
    items: [
      { id: "[ 01 ]", label: "PROJECTS", href: "/projects" },
      { id: "[ 02 ]", label: "ABOUT", href: "/about" },
      { id: "[ 03 ]", label: "CONTACT", href: "/contact" },
    ],
  },
  {
    title: "CASE STUDIES",
    items: [
      { id: "[ 04 ]", label: "ALFLIX", href: "/work/alflix" },
      { id: "[ 05 ]", label: "CIRCLE", href: "/work/circle" },
      { id: "[ 06 ]", label: "DUMBMERCH", href: "/work/dumbmerch" },
    ],
  },
  {
    title: "CONNECT",
    items: [
      {
        id: "[ 07 ]",
        label: "LINKEDIN",
        href: "https://www.linkedin.com/in/alfin-dwi-wadani",
      },
      {
        id: "[ 08 ]",
        label: "INSTAGRAM",
        href: "https://www.instagram.com/alvindvvi",
      },
      { id: "[ 09 ]", label: "TWITTER", href: "https://x.com/alvindvvi" },
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
    <footer className="border-t border-l border-r border-[#6a686d] px-10 bg-[#0a090f]">
      <div className="flex text-white justify-between items-center py-6">
        <LogoScramble />

        <div className="flex items-center gap-3">
          <p className="text-md uppercase tracking-widest text-white flex items-center gap-1">
            Fullstack Developer
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12 border-t border-b border-[#6a686d] py-12">
        {footerLinks.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <h2 className="text-white font-medium tracking-wider text-md">
              {section.title}
            </h2>
            <ul className="space-y-2 text-white text-sm">
              {section.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <p className="text-[10px] tracking-widest text-[#6a686d]">
                    {item.id}
                  </p>
                  <NavItem
                    href={item.href}
                    text={item.label}
                    className="relative z-10 block font-grotesk text-sm cursor-pointer"
                  />
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex gap-10  text-white justify-between items-center py-6">
        <p className="text-sm">© 2025 Alfin Dwi Wadani</p>
        <p className="text-sm font-medium">{time}</p>
      </div>
    </footer>
  );
}
