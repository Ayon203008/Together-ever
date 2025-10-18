"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

// Defined colors for the theme
const PRIMARY_COLOR = '#8B4513'; // Saddle Brown
const ACCENT_COLOR = '#A0522D';  // Sienna
const TEXT_DARK = '#4A2B0E';     // Darker brown for text

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring", stiffness: 150 } }
};

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
            
          <motion.h1 
            initial="hidden"
            animate="show"
            variants={textVariants}
            className={`text-4xl sm:text-5xl lg:text-7xl font-extrabold font-serif text-[${TEXT_DARK}] leading-tight tracking-wide drop-shadow-md`}
          >
            Discover Your <br className="hidden sm:inline" />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[${PRIMARY_COLOR}] to-[${ACCENT_COLOR}] font-black`}>
                Forever Love
            </span>
            <span className="text-4xl sm:text-5xl lg:text-7xl font-light text-stone-700">.</span>
          </motion.h1>

          <motion.p 
            initial="hidden"
            animate="show"
            variants={textVariants}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`text-lg sm:text-xl text-gray-700 max-w-lg leading-relaxed font-medium`}
          >
            TogetherEver helps you find compatible life partners through detailed biodatas and secure connections, making your journey to marriage beautiful and meaningful.
          </motion.p>

          <motion.button 
            initial="hidden"
            animate="show"
            variants={buttonVariants}
            className={`mt-6 bg-[${PRIMARY_COLOR}] hover:bg-[${ACCENT_COLOR}] text-white font-extrabold py-4 px-12 rounded-full shadow-2xl transition duration-300 ease-in-out uppercase text-base tracking-widest transform hover:translate-y-[-2px]`}
          >
            Find Your Match
          </motion.button>
        </div>

        {/* Right Image Area (Kept original structure for visual balance) */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[650px] flex items-center justify-center mt-10 lg:mt-0">
          {/* Top Image */}
          <div className="absolute top-[0px] right-[200px] w-[300px] h-[400px] lg:w-[360px] lg:h-[460px] bg-white shadow-2xl overflow-hidden border-4 border-white rounded-xl z-10">
            <Image
              src="/images/hero-2.png"
              alt="Couple holding hands"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Bottom Image */}
          <div className="absolute top-[190px] left-[10px] w-[230px] h-[260px] lg:w-[230px] lg:h-[300px] bg-white shadow-2xl overflow-hidden border-4 border-white rounded-xl z-20 border-[${PRIMARY_COLOR}]/50">
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