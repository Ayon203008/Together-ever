"use client";

import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const profileImage = e.target.profileImage.value;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, profileImage }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Registered successfully! You can login now.", { duration: 4000 });
        e.target.reset(); // form reset
        router.push('/login');
      } else {
        toast.error(data.message || "❌ Registration failed.", { duration: 4000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Something went wrong.", { duration: 4000 });
    }

    setLoading(false);
  };




  return (
    <section className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: "url('https://i.postimg.cc/1tdZL8Hy/bg-3.png')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-lg border border-[#d8c9c1]/60"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Create an Account</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 border border-[#e5d9d3]"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 border border-[#e5d9d3]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 border border-[#e5d9d3]"
              required
            />
          </div>

          {/* Image URL */}
          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-gray-500" />
            <input
              type="url"
              name="profileImage"
              placeholder="Profile Image URL"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 border border-[#e5d9d3]"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 bg-gradient-to-r from-rose-400 to-amber-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account? <a href="/login" className="text-rose-500 font-semibold hover:underline">Login</a>
        </p>
      </motion.div>
    </section>
  );
}
