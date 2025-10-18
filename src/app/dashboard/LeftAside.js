"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUserEdit,
  FaEnvelopeOpenText,
  FaCogs,
  FaSignOutAlt,
  FaRegUserCircle,
  FaRing,
} from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

export default function LeftAside() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <FaHome />, href: "/" },
    { name: "Create Biodata", icon: <FaUserEdit />, href: "/dashboard/createbiodata" },
    { name: "View Biodata", icon: <FaRegUserCircle />, href: "/dashboard/viewbiodata" },
    { name: "Favourites", icon: <MdFavorite />, href: "/dashboard/favouritebiodata" },
    { name: "Got Married", icon: <FaRing />, href: "/dashboard/gotmarried" },
    { name: "Logout", icon: <FaSignOutAlt />, href: "/logout" },
  ];

  return (
    <motion.aside
      onHoverStart={() => setSidebarOpen(true)}
      onHoverEnd={() => setSidebarOpen(false)}
      className="bg-white/70 backdrop-blur-md shadow-xl z-50 rounded-r-3xl overflow-hidden border-r border-gray-200"
      animate={{ width: sidebarOpen ? 220 : 72 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex flex-col h-full justify-between py-6">
        <div className="flex flex-col gap-3 px-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={`flex items-center cursor-pointer w-full rounded-lg p-3 transition-colors
                  ${
                    activeMenu === item.name
                      ? "bg-gradient-to-r from-blue-100 to-pink-100 shadow-inner"
                      : "hover:bg-blue-50"
                  }`}
                onClick={() => setActiveMenu(item.name)}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className={`text-xl ${
                    activeMenu === item.name ? "text-pink-600" : "text-gray-700"
                  }`}
                >
                  {item.icon}
                </motion.div>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`ml-4 font-medium ${
                      activeMenu === item.name ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {sidebarOpen && (
          <div className="mt-6 flex flex-col items-center text-gray-500 text-sm">
            <span>v1.0.0</span>
            <span>© 2025 TogetherEver</span>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
