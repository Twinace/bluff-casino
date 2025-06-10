"use client";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <img src="/images/heroImg1.svg" alt="Roll the dice" />
      <img src="/images/heroIMG2.svg" alt="Weekly Race" />
      <img src="/images/HeroIMG3.svg" alt="Welcome Bonus" />
      {/* <div className="relative bottom-0 mt-auto z-20 flex flex-col md:flex-row justify-between items-end gap-6 p-6 md:p-8 text-white w-full">
        <div className="flex flex-col gap-4 ">
          <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-black/80 w-fit">
            Label
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="text-white">$TRUMP</span>
            <span className="text-white">it up!</span>
          </h1>
          <p className="text-lg text-white/80">Hit that double six</p>
          <span className="inline-block mt-2 px-6 py-2 text-sm font-medium rounded-full bg-black/80 w-fit">
            Label
          </span>
        </div>

        <div className="flex gap-4 mt-6 md:mt-0">
          <div className="w-[90px] h-[60px] md:w-[100px] md:h-[70px] rounded-xl bg-[#842EFF] border-2 border-white"></div>
          <div className="w-[90px] h-[60px] md:w-[100px] md:h-[70px] rounded-xl bg-[#0047FF]"></div>
          <div className="w-[90px] h-[60px] md:w-[100px] md:h-[70px] rounded-xl bg-[#CC5234]"></div>
        </div>
      </div> */}
    </section>
  );
}
