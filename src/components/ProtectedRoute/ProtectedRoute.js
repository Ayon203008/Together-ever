"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // যখন লগইন না করা থাকে তখন Login পেজে পাঠাও
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Checking authentication...
      </div>
    );
  }

  // যদি লগইন না করা থাকে তাহলে কিছু দেখাবে না
  if (!session) return null;

  // ✅ লগইন করা ইউজারদের জন্য children render করো
  return <>{children}</>;
}
