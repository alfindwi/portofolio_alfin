import { TextReveal } from "./ui/text-reveal";

export function WhyChooseMe() {
  return (
    <div className="flex justify-between">
      <div className="py-20 flex justify-center items-center">
        <h1 className="text-5xl uppercase md:text-8xl font-bold text-white overflow-hidden">
          Why Choose Me?
        </h1>
      </div>

      <div className="md:border-r md:border-l border-[#6a686d] md:w-[800px] relative">
        <div className="hidden md:block absolute bottom-0 left-50 w-[385px] border-b-1 border-white"></div>

        <h1 className="absolute bottom-0 right-0 flex items-center text-[11px] text-white">
          <span className="tracking-[2px] text-white mr-2">
            //////////////////
          </span>
          ABT_ME_1101
        </h1>
      </div>
    </div>
  );
}

export function DescChooseMe() {
  return (
    <div className="border border-[#6a686d] p-5 md:p-20 flex items-center justify-center">
      <TextReveal className="text-xl md:text-5xl font-bold text-white overflow-hidden">
        With one year of experience in software development, I focus on building
        user-friendly and scalable solutions. I enjoy collaborating in teams,
        follow Agile/Scrum methods, and consistently deliver projects on time
        with high-quality results.
      </TextReveal>
    </div>
  );
}
