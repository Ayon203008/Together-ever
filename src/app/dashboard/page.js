"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaEnvelopeOpenText,
  FaCogs,
  FaRing,
} from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function DashboardPage() {
  const cards = [
    {
      title: "My Profile",
      icon: <FaUserEdit />,
      description: "View and edit your profile details",
      href: "/dashboard/editbiodata",
    },
    {
      title: "Messages",
      icon: <FaEnvelopeOpenText />,
      description: "Check your latest messages and notifications",
      href: "/dashboard/viewbiodata",
    },
    {
      title: "Favourites",
      icon: <MdFavorite />,
      description: "See and manage your favourite biodatas",
      href: "/dashboard/favouritebiodata",
    },
    {
      title: "Got Married?",
      icon: <FaRing />,
      description: "Celebrate and share your success story!",
      href: "/dashboard/gotmarried",
    },
    {
      title: "Settings",
      icon: <FaCogs />,
      description: "Manage your account and preferences",
      href: "/dashboard/settings",
    },
  ];

  return (
    
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <motion.div
              className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 flex flex-col items-start cursor-pointer hover:shadow-2xl transition-all"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0px 15px 40px rgba(0,0,0,0.15)",
              }}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.2 }}
                className="text-4xl text-blue-500 mb-4"
              >
                {card.icon}
              </motion.div>
              <h2 className="text-xl font-bold text-gray-900">{card.title}</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
    
  );
}
