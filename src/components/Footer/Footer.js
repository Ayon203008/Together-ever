"use client";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaTwitter, FaPinterestP, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-stone-900 text-gray-300 pt-20 pb-10 overflow-hidden">
      {/* Left Floral Decoration */}
      <div className="absolute bottom-0 left-0 w-[280px] h-[220px] opacity-90 pointer-events-none z-0">
        <Image
          src="/images/footer-shape-1 (1).png"
          alt="Decorative Flower Left"
          fill
          className="object-contain"
        />
      </div>

      {/* Right Floral Decoration */}
      <div className="absolute top-0 right-0 w-[180px] h-[280px] opacity-90 pointer-events-none z-0">
        <Image
          src="/images/footer-shape-2.png"
          alt="Decorative Flower Right"
          fill
          className="object-contain"
        />
      </div>

      {/* Footer Main Content */}
      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
        {/* Useful Links Section */}
        <div>
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-white tracking-wider uppercase">
            Useful Links
          </h3>
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm md:text-base">
            {[
              ["About", "/about"],
              ["Our Story", "/our-story"],
              ["RSVP Form", "/rsvp"],
              ["Gallery", "/gallery"],
              ["Pricing", "/pricing"],
              ["News & Blog", "/blog"],
            ].map(([text, href]) => (
              <a
                key={text}
                href={href}
                className="hover:text-amber-500 transition duration-300"
              >
                {text}
              </a>
            ))}
          </div>
        </div>

        {/* Brand Section */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-5xl md:text-6xl font-serif font-extrabold mb-6 text-amber-500 tracking-widest">
            Habibi
          </h3>
          <p className="text-base md:text-lg text-gray-400 max-w-sm mb-8 italic leading-relaxed">
            We can’t wait to see all of our beloved friends and relatives at our
            wedding.
          </p>
          <div className="flex space-x-5">
            {[
              { Icon: FaFacebookF, href: "https://facebook.com" },
              { Icon: FaTwitter, href: "https://twitter.com" },
              { Icon: FaPinterestP, href: "https://pinterest.com" },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-gray-500 text-gray-400 rounded-full hover:border-amber-500 hover:text-amber-500 transition duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-white tracking-wider uppercase">
            Contact
          </h3>
          <div className="space-y-3 text-sm md:text-base">
            <p className="hover:text-amber-500 transition duration-300 cursor-pointer">
              mail@habibitheme.com
            </p>
            <address className="not-italic leading-relaxed text-gray-400">
              4517 Washington Ave.<br />
              Manchester, Kentucky 39495
            </address>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-20 border-t border-gray-700"></div>

      {/* Bottom Bar */}
      <div className="pt-6 text-center text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-amber-500 font-semibold">Habibi</span> | All rights reserved.
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition duration-300 z-20"
        title="Go to top"
      >
        <FaArrowUp size={16} />
      </button>
    </footer>
  );
};

export default Footer;
