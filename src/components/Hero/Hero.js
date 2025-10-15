"use client";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-[#FDF9F3] min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Decorative Left Flower */}
      <div className="absolute top-0 left-0 opacity-90 z-0">
        <Image
          src="/images/flower2.png"
          height={220}
          width={220}
          alt="Decorative Flower Left"
          className="object-contain"
        />
      </div>

      {/* Decorative Right Flower */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-90 pointer-events-none z-0">
        <Image
          src="/images/flower3.png"
          alt="Decorative Leaves Right"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Text Area */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-stone-800 leading-tight tracking-wide">
            Discover Your <br className="hidden sm:inline" />
            Forever Love.
          </h1>

          <p className="text-base sm:text-lg text-gray-700 max-w-lg leading-relaxed">
            TogetherEver helps you find compatible life partners through detailed biodatas and secure connections, making your journey to marriage beautiful and meaningful.
          </p>

          <button className="mt-4 bg-[#8B4513] hover:bg-[#A0522D] text-white font-semibold py-3 px-10 rounded-md shadow-lg transition duration-300 ease-in-out uppercase text-sm tracking-wider">
            Find Your Match
          </button>
        </div>

        {/* Right Image Area */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[650px] flex items-center justify-center mt-10 lg:mt-0">
          {/* Top Image */}
          <div className="absolute top-[80px] right-[120px] w-[320px] h-[420px] lg:w-[360px] lg:h-[460px] bg-white shadow-2xl overflow-hidden border-4 border-white rounded-xl z-10">
            <Image
              src="/images/hero-2.png"
              alt="Couple holding hands"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Bottom Image */}
          <div className="absolute bottom-[60px] left-[60px] w-[200px] h-[260px] lg:w-[230px] lg:h-[300px] bg-white shadow-lg overflow-hidden border-4 border-white rounded-xl z-20">
            <Image
              src="/images/hero-1.png"
              alt="Wedding flowers"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
