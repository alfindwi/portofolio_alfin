"use client";

import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LuAudioLines } from "react-icons/lu";
import { NavItem } from "./LinkScramble";
import { LogoScramble } from "./logoScramble";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolledUp, setScrolledUp] = useState(false);
  const [sound, setSound] = useState(false);
  const [time, setTime] = useState("--:--");

  const navRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/backsound.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
    }
    if (!sound) {
      audioRef.current
        .play()
        .then(() => {
          setSound(true);
        })
        .catch(() => {
          alert("Browser belum mengizinkan audio. Klik lagi untuk aktifkan.");
        });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSound(false);
    }
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isHidden = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nav = navRef.current;
      if (!nav) return;

      if (currentScrollY === 0) {
        setScrolledUp(false);
        gsap.to(nav, { y: "0%", duration: 0.6, ease: "power3.out" });
        isHidden = false;
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY) < 5) return;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        if (!isHidden) {
          isHidden = true;
          gsap.to(nav, { y: "-120%", duration: 0.6, ease: "power3.inOut" });
        }
      } else {
        if (isHidden) {
          isHidden = false;
          gsap.to(nav, {
            y: "0%",
            duration: 0.6,
            ease: "power3.out",
            onStart: () => setScrolledUp(true),
          });
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.set(sidebarRef.current, { x: "100%" });
    }
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
    }
  }, []);

  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (isOpen) {
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });

      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          delay: 0.1,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
        if (sidebarRef.current) {
          gsap.set(sidebarRef.current, { x: "100%" });
        }
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full text-white transition-all duration-300 z-50
    ${
      scrolledUp
        ? "bg-[#0a090f] backdrop-blur-md border border-[#6a686d] rounded-md shadow-lg max-w-[calc(100%-5px)] md:max-w-[calc(100%-10px)] left-1 mt-2"
        : "bg-[#0a090f] border-b border-[#6a686d]"
    }`}
      >
        <div className="relative max-w-full mx-auto flex items-center justify-between py-4 px-8">
          <LogoScramble />

          <ul className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
            <NavItem text="PROJECTS" />
            <NavItem text="ABOUT" />
            <NavItem text="CONTACT" />
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSound}
              className="flex items-center gap-2 text-[11px] cursor-pointer hover:bg-[#353535]/30 hover:border border-[#353535] p-2 rounded-sm bg-transparent"
            >
              TURN ON SOUND
              <LuAudioLines className="text-lg" />
            </button>
            <p className="text-sm font-medium">{time}</p>
            {!isOpen && (
              <button
                className="md:hidden z-50 border border-[#353535] p-2 rounded-full bg-transparent"
                onClick={toggleMenu}
              >
                <Menu size={28} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none z-40"
        onClick={toggleMenu}
      />

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-50 h-full w-[75%] sm:w-[60%] 
                 bg-[#5542ff] text-white flex flex-col 
                 [clip-path:polygon(0_0,100%_0,100%_100%,20px_100%,0_calc(100%-40px))]  ${
                   isOpen ? "translate-x-0" : "translate-x-full"
                 }`}
      >
        <div className="flex justify-between p-6">
          <p className="text-xl font-bold">alfindwi</p>
          <button
            onClick={toggleMenu}
            className="border border-[#332994] p-2 rounded-full bg-[#332994]"
          >
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col items-start justify-start px-5 py-8 gap-6 text-3xl font-bold flex-1">
          {["WORK", "EXPERIMENTS", "ABOUT", "CONTACT"].map((item, i) => (
            <li
              key={i}
              ref={(el) => {
                if (el) menuItemsRef.current[i] = el;
              }}
            >
              <a
                href="#"
                onClick={toggleMenu}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-sm opacity-70">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="text-center pb-6 text-xs opacity-80">
          <p suppressHydrationWarning>{time}</p>
        </div>
      </div>
    </>
  );
}
