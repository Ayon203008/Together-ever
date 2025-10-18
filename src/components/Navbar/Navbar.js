"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session, status } = useSession(); // get session

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
 
  ];

  if (status === "authenticated" ) {
  navLinks.push({ name: "Dashboard", href: "/dashboard" });
}

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-[#D1BFA4] ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
         
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#80613C] tracking-wide">
              Soul<span className="text-[#C49A6C]">Match</span>
            </h1>
          </Link>

          {/* Desktop Links */}
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

            {/* Login / Logout */}
            {status === "loading" ? (
              <span className="ml-6 px-6 py-2 text-gray-500">Checking...</span>
            ) : status === "authenticated" ? (
              <div className="flex items-center gap-4 ml-6">
                <span className="text-[#80613C] font-medium">
                  {session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-6 py-2 bg-gradient-to-r from-[#80613C] to-[#C49A6C] text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="ml-6 px-6 py-2 bg-gradient-to-r from-[#80613C] to-[#C49A6C] text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
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

                {/* Mobile Login / Logout */}
                <li>
                  {status === "loading" ? (
                    <span className="px-8 py-2 text-gray-500">Checking...</span>
                  ) : status === "authenticated" ? (
                    <button
                      onClick={() => signOut()}
                      className="px-8 py-2 bg-gradient-to-r from-[#80613C] to-[#C49A6C] text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link href="/login">
                      <button className="px-8 py-2 bg-gradient-to-r from-[#80613C] to-[#C49A6C] text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300">
                        Login
                      </button>
                    </Link>
                  )}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent overlap */}
      <div className="h-20" />
    </>
  );
}
