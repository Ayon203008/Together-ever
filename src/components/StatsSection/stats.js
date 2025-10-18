"use client";
import { motion } from "framer-motion";
import { FaHeart, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

// Defined colors for a premium, earthy, and warm theme
const PRIMARY_COLOR = '#8B4513'; // Saddle Brown
const ACCENT_COLOR = '#A0522D';  // Sienna
const TEXT_DARK = '#4A2B0E';     // Darker brown for text
const BG_LIGHT = '#FDF9F3';     // Light creamy background

const statsData = [
  { id: 1, icon: FaHeart, value: 1200, label: "Happy Couples" },
  { id: 2, icon: FaUserFriends, value: 5000, label: "Active Members" },
  { id: 3, icon: FaUsers, value: 3500, label: "Matches Made" },
];

// Framer Motion Variants for section and items
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 0.5
        }
    }
};

export default function Stats() {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            statsData.forEach((stat, idx) => {
              let start = 0;
              const end = stat.value;
              const duration = 2000; // ms
              const stepTime = 10;   // ms
              const increment = end / (duration / stepTime);

              const interval = setInterval(() => {
                start += increment;
                if (start >= end) {
                  start = end;
                  clearInterval(interval);
                }
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[idx] = Math.floor(start);
                  return newCounts;
                });
              }, stepTime);
            });
            setHasAnimated(true);
            observer.disconnect(); // Stop observing once animated
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    const section = document.getElementById("stats-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [hasAnimated]);

  return (
    <motion.section
      id="stats-section"
      className={`relative bg-[${BG_LIGHT}] py-20 md:py-32 px-4 md:px-12 overflow-hidden`}
      variants={sectionVariants}
      initial="hidden"
      animate="show"
    >
      {/* Background Flower 1 (Top Right) */}
      <Image
        alt="Decorative flower top right"
        src="/images/flower3.png" // আপনার ফুলের ইমেজের পাথ
        width={500}
        height={500}
        className="absolute top-0 right-0 opacity-80 rotate-12 -translate-y-1/4 translate-x-1/4 pointer-events-none z-0 hidden lg:block"
      />
      {/* Background Flower 2 (Bottom Left) */}
      <Image
        alt="Decorative flower bottom left"
        src="/images/flower2.png" // আপনার ফুলের ইমেজের পাথ
        width={500}
        height={500}
        className="absolute bottom-0 left-0 opacity-80 -rotate-12 translate-y-1/4 -translate-x-1/4 pointer-events-none z-0 hidden lg:block"
      />

      {/* Section Header */}
      <div className="relative max-w-6xl mx-auto text-center mb-16 z-10">
        <h2 className={`text-4xl md:text-5xl font-extrabold font-serif text-[${TEXT_DARK}] mb-4 leading-tight`}>
          Our <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[${PRIMARY_COLOR}] to-[${ACCENT_COLOR}]`}>Journey</span> in Numbers
        </h2>
        <p className={`text-[${TEXT_DARK}] text-lg md:text-xl max-w-3xl mx-auto font-medium`}>
          TogetherEver has proudly connected hearts, creating countless stories of love and companionship.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto z-10">
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 4px ${PRIMARY_COLOR}30`, // Custom hover shadow with border effect
              }}
              className={`bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 md:p-12 transition-all duration-500 ease-out border-b-8 border-[${ACCENT_COLOR}]/40`}
            >
              {/* Icon */}
              <div className={`text-[${PRIMARY_COLOR}] mb-5 p-4 rounded-full bg-[${ACCENT_COLOR}]/10`}>
                <Icon className="text-5xl md:text-6xl" />
              </div>

              {/* Animated Counter */}
              <motion.div
                className={`text-5xl md:text-6xl font-bold font-sans text-[${TEXT_DARK}] mb-2`}
              >
                {counts[idx].toLocaleString()}
              </motion.div>

              {/* Label */}
              <p className={`text-[${PRIMARY_COLOR}] text-xl md:text-2xl font-semibold text-center mt-2`}>
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}