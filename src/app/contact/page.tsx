"use client";

import { ButtonItem } from "@/components/buttonScramble";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/shadcn-io/copy-button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const shareEmail = "alfindwi190@gmail.com";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);

    if (res.status === 200) {
      setSuccess(true);
      form.reset();
    }
  }

  return (
    <div className="flex bg-[#0a090f]  flex-col">
      <div className="px-5 md:px-10">
        <div
          id="desc-section"
          className="flex flex-col text-white border border-[#6a686d] pt-18 md:pt-16 relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border border-[#6a686d] p-6 md:p-10 gap-8 relative">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#6a686d]" />

            <motion.div
              className="flex flex-col items-start md:w-1/2 gap-2"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h1 className="leading-[0.95] uppercase font-semibold tracking-tight text-4xl md:text-5xl lg:text-8xl">
                Let’s work
              </h1>
              <h1 className="leading-[0.95] uppercase font-semibold tracking-tight text-4xl md:text-5xl lg:text-8xl">
                together
              </h1>
            </motion.div>

            <motion.div
              className="md:w-1/2 md:p-10 p-0 text-left"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "backOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                Contact me today if you're looking to build a website, improve
                an existing one, or discuss a potential collaboration — let's
                find a solution together.
              </p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-start">
              <div className=" border-r  border-[#6a686d] ">
                <div className="hidden md:block top-0 px-10 pt-15">
                  <span className="uppercase text-[10px] tracking-widest text-gray-400">
                    [Email]
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono">
                      alfindwi190@gmail.com
                    </span>
                    <CopyButton variant={"white"} content={shareEmail} />
                  </div>
                </div>
                <div className="hidden md:block top-0 px-10 pt-10 pb-15">
                  <span className="uppercase text-[10px] tracking-widest text-gray-400">
                    [For collaborators]
                  </span>

                  <div className="flex items-center gap-2 max-w-[270px]">
                    <span className="text-lg font-mono">
                      I'm always open to partnering with developers, agencies,
                      UMKM, and anyone interested in my work. Send me an email
                      and let's talk.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="max-w-[1000px] h-full p-5 md:p-10">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
                    <div>
                      <span className="uppercase text-[14px] tracking-widest text-white">
                        what's your name?
                      </span>
                      <Input
                        className="w-full p-5 mt-2"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <span className="uppercase text-[14px] tracking-widest text-white">
                        what's your email?
                      </span>
                      <Input
                        type="email"
                        className="w-full p-5 mt-2"
                        placeholder="user@gmail.com"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="uppercase text-[14px] tracking-widest text-white">
                      How can I help?
                    </span>
                    <Textarea
                      className="w-full p-5 mt-2"
                      placeholder="Describe your project or idea..."
                    />
                  </div>
                  <div className="flex justify-start pt-10">
                    <ButtonItem
                      text="Send"
                      size="md"
                      className="bg-yellow-300 text-black rounded w-full md:w-auto"
                    ></ButtonItem>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
