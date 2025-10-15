"use client"; // Required because we use a hook

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); // ✅ inside the component
  const isDashboard = pathname.startsWith("/dashboard"); // now it works

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!isDashboard && <Navbar />}
        <main>
          {children}
          <Toaster position="bottom-right" richColors />
        </main>
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
