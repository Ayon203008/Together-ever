"use client";
import { motion } from "framer-motion";
import { FaHeart, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

const statsData = [
  { id: 1, icon: FaHeart, value: 1200, label: "Happy Couples" },
  { id: 2, icon: FaUserFriends, value: 5000, label: "Active Members" },
  { id: 3, icon: FaUsers, value: 3500, label: "Matches Made" },
];

export default function Stats() {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  // Animated counter
  useEffect(() => {
    statsData.forEach((stat, idx) => {
      let start = 0;
      const end = stat.value;
      const increment = Math.ceil(end / 100);
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[idx] = start;
          return newCounts;
        });
      }, 25);
    });
  }, []);

  return (
    <section className="relative bg-[#F4F0ED] py-20 px-4 md:px-12 overflow-hidden">
      {/* Background Flower */}
      <Image
        alt="background flower"
        src="/images/bg-4.png"
        fill
        className="absolute top-0 left-0 w-full h-full object-contain opacity-15 pointer-events-none z-0"
      />

      {/* Section Header */}
      <div className="relative max-w-6xl mx-auto text-center mb-12 z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
          Our Impact in Numbers
        </h2>
        <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
          TogetherEver has helped thousands of singles find love and happiness.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 z-10">
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center py-10 px-5 md:px-8 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="text-indigo-500 mb-3">
                <Icon className="text-4xl md:text-5xl" />
              </div>

              {/* Animated Counter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-1"
              >
                {counts[idx]}
              </motion.div>

              {/* Label */}
              <p className="text-gray-600 text-base md:text-lg font-medium text-center">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
