"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

export default function RegisterForm() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <section
      className="relative mt-10 w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/1tdZL8Hy/bg-3.png')", // your light background
      }}
    >
      {/* Subtle gradient overlay for contrast */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#f6ede8]/40 via-[#f6ede8]/20 to-[#f6ede8]/60 backdrop-blur-[2px]"></div> */}

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-[#d8c9c1]/60"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create an Account
        </h2>

        <form className="flex flex-col gap-6">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 placeholder-gray-400 border border-[#e5d9d3] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 placeholder-gray-400 border border-[#e5d9d3] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 placeholder-gray-400 border border-[#e5d9d3] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
            />
          </div>

          {/* Image Link */}
          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-gray-500" />
            <input
              type="url"
              placeholder="Profile Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 placeholder-gray-400 border border-[#e5d9d3] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
            />
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-2"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#e5d9d3] shadow-lg">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={() => setImageUrl("")}
                />
              </div>
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 bg-gradient-to-r from-rose-400 to-amber-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-rose-500 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </motion.div>
    </section>
  );
}
