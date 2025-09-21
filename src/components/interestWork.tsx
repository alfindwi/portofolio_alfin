import { motion } from "motion/react";
import { PhotoCard } from "./imageComponent";
import { ButtonItem } from "./buttonScramble";

export function InterestWork() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <motion.div
          className="py-20 flex justify-center items-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-5xl uppercase md:text-8xl font-bold text-white overflow-hidden">
            Interested in <span className="flex justify-end">working</span>{" "}
            <span className="flex justify-end">together?</span>
          </h1>
        </motion.div>

        <div className="md:border-r border-[#6a686d] md:w-[300px] relative">
          <div className="hidden md:block absolute bottom-0 right-0 w-[400px] border-b-1 border-white"></div>

          <h1 className="absolute bottom-0 right-0 flex items-center text-[11px] text-white">
            <span className="tracking-[2px] text-white mr-2">
              //////////////////
            </span>
            INT_WORK_1101
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center p-10 border border-[#6a686d] max-w-[750px]">
        <div className="relative w-fit">
          <PhotoCard
            label="PHOTO_1101"
            imageSrc="/apingg.jpeg"
            width={400}
            height={400}
          />

          <ButtonItem
            href="/contact"
            text="Send a message"
            className="absolute bottom-4 right-4 z-10 bg-yellow-300 text-black font-medium px-6 py-2 rounded-sm shadow-md hover:bg-yellow-400 transition"
          />
        </div>
      </div>
    </div>
  );
}
