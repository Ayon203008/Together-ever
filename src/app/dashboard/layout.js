"use client";

import LeftAside from "./LeftAside";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Sidebar */}
      <LeftAside />

      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
