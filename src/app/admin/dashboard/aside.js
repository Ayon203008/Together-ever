"use client";

import Link from "next/link";
import { FaTachometerAlt, FaUsers, FaStar, FaHeart } from "react-icons/fa";

export default function Aside({ open, setOpen }) {
  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col mt-10 gap-2">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F0E6] transition-all"
        >
          <FaTachometerAlt size={20} className="text-[#80613C]" />
          {open && <span className="font-medium">Admin Dashboard</span>}
        </Link>

        <Link
          href="/admin/users"
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F0E6] transition-all"
        >
          <FaUsers size={20} className="text-[#80613C]" />
          {open && <span className="font-medium">Manage Users</span>}
        </Link>

        <Link
          href="/admin/premium"
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F0E6] transition-all"
        >
          <FaStar size={20} className="text-[#80613C]" />
          {open && <span className="font-medium">Approved Premium</span>}
        </Link>

        <Link
          href="/admin/contact-requests"
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#F5F0E6] transition-all"
        >
          <FaHeart size={20} className="text-[#80613C]" />
          {open && <span className="font-medium">Approved Contact Requests</span>}
        </Link>
      </div>
    </aside>
  );
}
