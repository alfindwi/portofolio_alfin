import { motion } from "motion/react";
import { ButtonItem } from "./buttonScramble";
import { PhotoCard } from "./imageComponent";
import { Terminal } from "./ui/terminal";

export function InterestWork() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between border-r border-[#6a686d]">
        <motion.div
          className="py-20 flex justify-center items-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-5xl uppercase md:text-8xl font-bold text-white overflow-hidden">
            Interested in working together?
          </h1>
        </motion.div>

        <div className="md:border-r border-[#6a686d] md:w-[800px] relative">
          <div className="hidden md:block absolute bottom-0 right-0 w-[385px] border-b-1 border-white"></div>

          <h1 className="absolute bottom-0 right-0 flex items-center text-[11px] text-white">
            <span className="tracking-[2px] text-white mr-2">
              //////////////////
            </span>
            INT_WORK_1101
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row border-t border-b border-l border-[#6a686d] max-w-full overflow-hidden">
        <div className="flex-1 border-r md:border-b-0 md:border-r border-[#6a686d] p-6 flex justify-center items-center">
          <PhotoCard
            label="PHOTO_1101"
            imageSrc="/apingg.jpeg"
            width={400}
            height={400}
          >
            <div className="flex justify-end items-end h-full p-4">
              <ButtonItem
                href="/contact"
                text="Send a message"
                className="bg-yellow-300 text-black font-medium px-6 py-2 rounded-sm shadow-md transition"
              />
            </div>
          </PhotoCard>
        </div>

        <div className="flex-1 p-6 flex justify-center items-center border-r md:border-r-0 border-[#6a686d]">
          <Terminal className="w-full">{`echo "Hello World!"`}</Terminal>
        </div>
      </div>
    </div>
  );
}
