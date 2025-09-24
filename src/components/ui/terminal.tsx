"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { motion, MotionProps, useInView } from "motion/react";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ButtonItem } from "../buttonScramble";

interface SequenceContextValue {
  completeItem: (index: number) => void;
  activeIndex: number;
  sequenceStarted: boolean;
}

const SequenceContext = createContext<SequenceContextValue | null>(null);

const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext<number | null>(null);
const useItemIndex = () => useContext(ItemIndexContext);

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  startOnView?: boolean;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}: AnimatedSpanProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    if (!sequence || itemIndex === null) return;
    if (!sequence.sequenceStarted) return;
    if (hasStarted) return;
    if (sequence.activeIndex === itemIndex) {
      setHasStarted(true);
    }
  }, [sequence?.activeIndex, sequence?.sequenceStarted, hasStarted, itemIndex]);

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true;

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={cn("grid text-sm font-normal tracking-tight", className)}
      onAnimationComplete={() => {
        if (!sequence) return;
        if (itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  startOnView = true,
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:");
  }

  const MotionComponent = useMemo(
    () =>
      motion.create(Component, {
        forwardMotionProps: true,
      }),
    [Component]
  );

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const sequence = useSequence();
  const itemIndex = useItemIndex();

  useEffect(() => {
    if (sequence && itemIndex !== null) {
      if (!sequence.sequenceStarted) return;
      if (started) return;
      if (sequence.activeIndex === itemIndex) {
        setStarted(true);
      }
      return;
    }

    if (!startOnView) {
      const startTimeout = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(startTimeout);
    }

    if (!isInView) return;

    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [
    delay,
    startOnView,
    isInView,
    started,
    sequence?.activeIndex,
    sequence?.sequenceStarted,
    itemIndex,
  ]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
        if (sequence && itemIndex !== null) {
          sequence.completeItem(itemIndex);
        }
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
  sequence?: boolean;
  startOnView?: boolean;
}

type ChatMessage = {
  sender: "bot" | "user";
  text: string;
};

export const Terminal = ({
  children,
  className,
  sequence = true,
  startOnView = true,
}: TerminalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceHasStarted = sequence ? !startOnView || isInView : false;

  const contextValue = useMemo(() => {
    if (!sequence) return null;
    return {
      completeItem: (index: number) => {
        setActiveIndex((current) =>
          index === current ? current + 1 : current
        );
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    };
  }, [sequence, activeIndex, sequenceHasStarted]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "What brings you here today?" },
  ]);

  const handleUserResponse = (text: string) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);

    setTimeout(() => {
      let botReply = "";

      if (text === "I'm looking for collaboration") {
        botReply =
          "Awesome! Let's collaborate and build something amazing together";
      } else if (text === "I need help with a project") {
        botReply =
          "No worries! Let's discuss your project and find the best solution.";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 500);
  };

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children;
    const array = Children.toArray(children);
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as React.ReactNode}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence]);

  const content = (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-md rounded-xl py-2 border border-[#6a686d] bg-[#15151a]",
        className
      )}
    >
      <div className="flex flex-col gap-y-2 border-b border-[#6a686d] p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 overflow-y-auto max-h-[300px]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 items-start pb-2 ${
              i !== messages.length - 1 ? "border-b border-[#6a686d]" : ""
            } ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <>
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/avatar.jpeg"
                    alt="avatar"
                    className="rounded-full"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex flex-col max-w-[370px]">
                  <p className="text-[#ababac] text-[11px]">Alfin Dwi</p>
                  <p className="text-white text-[16px] whitespace-normal inline-block max-w-[300px]">
                    {msg.text}
                  </p>
                </div>
              </>
            )}

            {msg.sender === "user" && (
              <>
                <div className="flex flex-col items-end max-w-[370px]">
                  <p className="text-[#ababac] text-[11px]">You</p>
                  <p className="text-white text-[16px] whitespace-normal inline-block max-w-[300px] text-right">
                    {msg.text}
                  </p>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/cat_user.jpg"
                    alt="user avatar"
                    className="rounded-full"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
        ))}
      </div>

      {messages.length === 1 && (
        <div className="flex flex-col md:flex-row justify-center gap-2 p-4 border-t border-[#6a686d]">
          <ButtonItem
            text="Look for collaboration"
            onClick={() => handleUserResponse("I'm looking for collaboration")}
            className=" text-[13px] bg-transparent border border-[#6a686d] text-white"
          ></ButtonItem>
          <ButtonItem
            text="Build something amazing!"
            onClick={() => handleUserResponse("I need help with a project")}
            className="text-[13px] bg-transparent border border-[#6a686d] text-white"
          />
        </div>
      )}
    </div>
  );

  if (!sequence) return content;

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  );
};
