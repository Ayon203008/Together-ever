"use client";

import { useState } from "react";
import Aside from "./aside";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }) {
  const [asideOpen, setAsideOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FDF9F3]">
      {/* Sidebar */}
      <Aside open={asideOpen} setOpen={setAsideOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#80613C]">Admin Panel</h1>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-gradient-to-r from-[#80613C] to-[#C49A6C] text-white font-semibold rounded-md hover:scale-105 transition-all"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
