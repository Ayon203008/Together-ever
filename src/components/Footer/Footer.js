"use client";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#F8F4EB] py-24 px-6 md:px-12 overflow-hidden font-sans">
      {/* Optional subtle gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/20 via-transparent to-white/10"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 z-10">
        {/* Left: Logo + Info */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide">
            TogetherEver
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-sm">
            TogetherEver is a premium matrimony platform helping singles find their perfect match. Join our community today.
          </p>
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 transition-all duration-300"
              >
                <Icon className="text-lg md:text-xl" />
              </a>
            ))}
          </div>
        </div>

        {/* Center: Newsletter Subscription */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
            Subscribe to Our Newsletter
          </h3>
          <div className="flex w-full max-w-md shadow-lg rounded-full overflow-hidden bg-white">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-l-full transition-all duration-300"
            />
            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-8 py-4 font-semibold hover:scale-105 transform transition-transform duration-300 rounded-r-full">
              Subscribe
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2 text-center md:text-left">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>

        {/* Right: Quick Links */}
        <div className="flex-1 flex flex-col md:items-end gap-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-gray-700 text-base md:text-lg">
            {["Home", "About", "Success Stories", "Contact", "Privacy Policy", "Terms of Service"].map((link, idx) => (
              <li key={idx}>
                <a className="hover:text-indigo-500 hover:underline transition-colors duration-300" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative mt-20 border-t border-gray-300 pt-6 text-center text-gray-600 text-sm md:text-base z-10">
        &copy; {new Date().getFullYear()} TogetherEver. All rights reserved.
      </div>
    </footer>
  );
}
