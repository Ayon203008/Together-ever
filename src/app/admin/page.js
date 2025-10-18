"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session load
    if (!session) router.push("/login"); // Not logged in
    else if (session.user.role !== "admin") router.push("/"); // Not admin
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user.role !== "admin") return null;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        🧑‍💼 Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Biodatas</h2>
          <p>View, approve, or delete biodata submissions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p>Monitor registered users and roles.</p>
        </div>
      </div>
    </div>
  );
}
