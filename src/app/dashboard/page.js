"use client";

import { useState } from "react";
import { FaHome, FaUser, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Messages", icon: <FaEnvelope /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        onHoverStart={() => setSidebarOpen(true)}
        onHoverEnd={() => setSidebarOpen(false)}
        className="bg-white shadow-lg z-50"
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="mt-6 flex flex-col items-center gap-6">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                className="flex items-center cursor-pointer w-full hover:bg-blue-100 rounded-lg p-3 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-blue-500 text-xl">{item.icon}</div>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="ml-4 text-gray-800 font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
          >
            <div className="text-blue-500 text-3xl mb-3">
              <FaUser />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
            <p className="text-gray-600 mt-2">View and edit your profile details</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
          >
            <div className="text-green-500 text-3xl mb-3">
              <FaEnvelope />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
            <p className="text-gray-600 mt-2">Check your latest messages and notifications</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
          >
            <div className="text-purple-500 text-3xl mb-3">
              <FaCog />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            <p className="text-gray-600 mt-2">Manage your account and preferences</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
