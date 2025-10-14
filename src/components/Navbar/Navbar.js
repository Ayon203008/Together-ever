"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaGem } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all ${
        scrolled
          ? "bg-white/50 backdrop-blur-xl dark:bg-gray-900/50 shadow-lg h-16 md:h-20"
          : "bg-transparent h-20 md:h-24"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-full">
        {/* Logo */}
        <div>
            <Image src={'/images/logo.png'} alt="logo" height={100} width={80}/>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-800 dark:text-gray-100 font-semibold">
          {["Home", "About", "Success Stories", "Contact"].map((item) => (
            <li
              key={item}
              className="relative group cursor-pointer px-1 py-1"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all"></span>
            </li>
          ))}
          <li>
            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg transform transition-transform hover:scale-105">
              Join Now
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-gray-800 dark:text-gray-100 text-2xl">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg"
          >
            <ul className="flex flex-col items-center gap-4 py-6 text-gray-800 dark:text-gray-100 font-semibold">
              {["Home", "About", "Success Stories", "Contact"].map((item) => (
                <li
                  key={item}
                  className="relative group cursor-pointer px-2 py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all"></span>
                </li>
              ))}
              <li>
                <button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-2 rounded-full font-semibold shadow-lg transform transition-transform hover:scale-105">
                  Join Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
