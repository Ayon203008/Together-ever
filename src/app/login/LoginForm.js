"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Logged in successfully!");
      // Redirect to dashboard
      window.location.href = "/";
    }
  };

  return (
    <section className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://i.postimg.cc/1tdZL8Hy/bg-3.png')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-lg border border-[#e5d9d3]/60"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Login to continue your journey ✨</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 placeholder-gray-400 border border-[#e5d9d3] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf7f5] text-gray-800 placeholder-gray-400 border border-[#e5d9d3] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
            />
          </div>

          <div className="text-right text-sm">
            <a href="/forgot-password" className="text-rose-500 hover:text-rose-600 font-medium">Forgot Password?</a>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-rose-400 to-amber-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="flex items-center justify-center my-6">
          <div className="h-px w-1/4 bg-gray-300" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="h-px w-1/4 bg-gray-300" />
        </div>

        <p className="text-center text-gray-600 mt-8 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-rose-500 font-semibold hover:underline">Create one</a>
        </p>
      </motion.div>
    </section>
  );
}
