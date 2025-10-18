// components/AboutSection.jsx
"use client";
import Image from "next/image"; // Re-imported Next.js Image component
import { motion } from "framer-motion";
import { FaChartLine, FaShieldAlt, FaLightbulb } from 'react-icons/fa'; // Importing React Icons

export default function AboutSection() {
  // Define custom colors using Tailwind bracket notation
  const ACCENT_COLOR = '#A0522D'; // Deep Brown/Sienna
  const BG_COLOR = '#FDF9F3'; // Pale Cream

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: 5 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.0, ease: "easeOut", delay: 0.3 } },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    // Background color changed to custom Pale Cream
    <section className={`relative bg-[${BG_COLOR}] py-24 md:py-32 overflow-hidden`}>
      
      {/* --- Decorative Flowers: Top Left (Increased Size & Adjusted Position) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
        className="absolute top-0 -left-16 w-64 h-64 md:w-80 md:h-80 z-0"
      >
        {/* Reverted to Next.js Image with 'fill' for responsive design */}
        <Image
          src="/images/flower2.png" 
          alt="Top Left Decorative Flowers"
          fill // Mandatory for next/image when parent has defined dimensions
          className="opacity-30 rotate-3 object-contain"
        />
      </motion.div>

      {/* --- Decorative Flowers: Bottom Right (Increased Size & Adjusted Position) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: 15 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
        className="absolute -bottom-16 -right-16 w-64 h-64 md:w-80 md:h-80 z-0"
      >
        {/* Reverted to Next.js Image with 'fill' for responsive design */}
        <Image
          src="/images/flower2.png"
          alt="Bottom Right Decorative Flowers"
          fill // Mandatory for next/image when parent has defined dimensions
          className="opacity-40 -rotate-6 object-contain"
        />
      </motion.div>

      {/* --- Main Content Container --- */}
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24 px-6 relative z-10">
        
        {/* Left Text and Features Section */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="md:w-1/2 space-y-8"
        >
          {/* Accent Color for 'Martin' and primary black for text */}
          <h2 className="text-5xl md:text-6xl font-extrabold text-black leading-tight tracking-tight drop-shadow-sm">
            About <span className={`text-[${ACCENT_COLOR}]`}>Martin</span>Money
          </h2>
          
          {/* Quote Section with Accent Border and Black Text */}
          <p className={`text-xl text-black leading-relaxed border-l-4 border-[${ACCENT_COLOR}] pl-6 italic font-medium`}>
            "Your trusted partner in navigating the journey to financial well-being. We believe in empowering every individual to achieve their monetary dreams with clarity and confidence."
          </p>
          
          <div className="space-y-6 mt-8">
            <motion.div variants={featureVariants} className="flex items-start gap-4">
              {/* Accent Color for Icon */}
              <FaChartLine className={`text-[${ACCENT_COLOR}] text-3xl mt-1 flex-shrink-0`} />
              <div>
                {/* Black for Heading, Dark Gray for Body for contrast */}
                <h3 className="text-2xl font-semibold text-black tracking-wide">Smart Financial Tracking</h3>
                <p className="text-gray-800">Gain crystal-clear insights into your spending habits and savings with our intuitive dashboard.</p>
              </div>
            </motion.div>

            <motion.div variants={featureVariants} className="flex items-start gap-4">
              <FaShieldAlt className={`text-[${ACCENT_COLOR}] text-3xl mt-1 flex-shrink-0`} />
              <div>
                <h3 className="text-2xl font-semibold text-black tracking-wide">Secure & Reliable Platform</h3>
                <p className="text-gray-800">Your financial data is protected with state-of-the-art security, ensuring peace of mind.</p>
              </div>
            </motion.div>

            <motion.div variants={featureVariants} className="flex items-start gap-4">
              <FaLightbulb className={`text-[${ACCENT_COLOR}] text-3xl mt-1 flex-shrink-0`} />
              <div>
                <h3 className="text-2xl font-semibold text-black tracking-wide">Expert Guidance & Insights</h3>
                <p className="text-gray-800">Leverage personalized advice and educational resources to make smarter financial choices.</p>
              </div>
            </motion.div>
          </div>
          
          {/* Stylish, highly tracked accent text */}
          <p className={`text-2xl font-black text-[${ACCENT_COLOR}] mt-10 tracking-widest uppercase text-center md:text-left`}>
            Your money, your move.
          </p>
        </motion.div>

        {/* Right Image Card */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="relative w-full md:w-1/2 flex justify-center mt-10 md:mt-0 p-4"
        >
          <div className={`relative w-[380px] h-[480px] md:w-[480px] md:h-[600px] overflow-hidden rounded-3xl shadow-2xl shadow-[${ACCENT_COLOR}]/50 transform hover:scale-[1.02] transition-transform duration-500 ease-in-out border-4 border-white`}>
             {/* Reverted to Next.js Image with 'fill' */}
            <Image
              src="/images/pexels-skylake-17057196.jpg" 
              alt="Happy Couple Managing Finances"
              fill // Mandatory for next/image when parent has defined dimensions
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
