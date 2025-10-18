"use client";

import AdminLayout from "./layout";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#A0522D]">
          <h2 className="text-xl font-semibold text-[#80613C]">Total Users</h2>
          <p className="mt-2 text-gray-700 font-medium text-2xl">120</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#A0522D]">
          <h2 className="text-xl font-semibold text-[#80613C]">Approved Premium</h2>
          <p className="mt-2 text-gray-700 font-medium text-2xl">35</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#A0522D]">
          <h2 className="text-xl font-semibold text-[#80613C]">Contact Requests</h2>
          <p className="mt-2 text-gray-700 font-medium text-2xl">42</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#A0522D]">
          <h2 className="text-xl font-semibold text-[#80613C]">Other Stats</h2>
          <p className="mt-2 text-gray-700 font-medium text-2xl">--</p>
        </div>
      </div>
    </AdminLayout>
  );
}
