"use client";

export default function WelcomePage() {
  return (
    <main className="flex bg-[#0a090f] px-10  flex-col h-500">
      <div className="flex flex-col  text-white items-start justify-center border border-[#29282c]">
        <div className="px-70 py-40 flex flex-col md:flex-row items-start md:items-center">
          <h1 className="text-xl font-normal">Hi, I'm Alfin Dwi</h1>
          <h1 className="leading-[0.95] font-bold tracking-tight text-[2.5rem] md:text-[5rem] lg:text-[6.5rem] uppercase">
            Creative <br />
            Frontend <br />
            Developer
          </h1>
        </div>
      </div>
    </main>
  );
}
