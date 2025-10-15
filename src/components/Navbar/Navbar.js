"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Biodatas", href: "/biodatas" },
    { name: "AboutUs", href: "/AboutUs" },
    { name: "Success Stories", href: "/stories" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-[#D1BFA4]`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="logo"
              height={50}
              width={50}
              className="drop-shadow-md"
            />
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#80613C] tracking-wide">
              Soul<span className="text-[#C49A6C]">Match</span>
            </h1>
          </Link>

          {/* Desktop Links + Login */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 text-[#80613C] font-medium tracking-wide">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className="px-2 py-1 text-lg transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-[#C49A6C] group-hover:w-full transition-all duration-300 rounded-full"></span>
                </li>
              ))}
            </ul>

            {/* Login Button */}
            <Link href="/login">
              <button className="ml-6 px-6 py-2 bg-gradient-to-r from-[#80613C] to-[#C49A6C] text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden text-[#80613C] text-2xl">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-[#D1BFA4] shadow-md"
            >
              <ul className="flex flex-col items-center gap-6 py-6 text-lg font-medium text-[#80613C]">
                {navLinks.map((link) => (
                  <li key={link.name} onClick={() => setMenuOpen(false)}>
                    <Link
                      href={link.href}
                      className="hover:text-[#C49A6C] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/login">
                    <button className="px-8 py-2 bg-gradient-to-r from-[#80613C] to-[#C49A6C] text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300">
                      Login
                    </button>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent overlap */}
      <div className="h-20" /> {/* Same height as navbar */}
    </>
  );
}
