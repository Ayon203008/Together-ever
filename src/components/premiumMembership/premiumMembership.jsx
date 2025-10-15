"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

export default function PremiumMembership() {
  return (
    <div className="relative w-full h-[500px] flex justify-center items-center p-4">
      {/* Background Image */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src="/images/premium.png"
          alt="Premium Membership Card"
          fill
          className="object-cover rounded-3xl brightness-90"
          priority
        />

        {/* Overlay content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg w-[300px] text-center"
        >
          <div className="flex justify-center mb-3">
            <FaCrown className="text-yellow-500 text-4xl drop-shadow-md" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Go Premium 🚀
          </h2>
          <p className="text-gray-700 text-sm mb-5 leading-relaxed">
            Unlock exclusive matchmaking features, highlight your profile, and
            connect faster with your perfect match.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md font-semibold hover:shadow-lg transition"
          >
            Upgrade Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
