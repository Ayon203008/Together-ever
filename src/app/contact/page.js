"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCommentDots, FaUserTie } from 'react-icons/fa';
import Image from 'next/image';

// আপনার থিমের প্রধান রং
const PRIMARY_COLOR = '#8B4513'; // Saddle Brown
const ACCENT_COLOR = '#A0522D';  // Sienna

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

const ContactUs = () => {
    return (
        <motion.div 
            className="bg-[#FDF9F3] min-h-screen"
            initial="hidden"
            animate="show"
            variants={containerVariants}
        >
            
            {/* 1. Hero Section - Elegant Introduction */}
            <motion.section 
                className="relative py-24 md:py-32 overflow-hidden border-b-4 border-[#8B4513]/10"
                variants={itemVariants}
            >
                {/* Subtle Decorative Texture */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/soft-texture-bg.jpg')", backgroundRepeat: "repeat" }} />

                <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
                    <motion.h1 
                        className="text-6xl md:text-7xl font-serif font-extrabold text-stone-800 leading-tight mb-4 drop-shadow-md"
                        variants={itemVariants}
                    >
                        Contact <span className={`text-[${ACCENT_COLOR}]`}>TogetherEver</span>
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-gray-700 max-w-3xl mx-auto italic"
                        variants={itemVariants}
                    >
                        We value your privacy and journey. Reach out to our dedicated support and concierge team through the most convenient channel below.
                    </motion.p>
                </div>
            </motion.section>

            {/* --- */}

            {/* 2. Contact Information Cards */}
            <section className="py-20 md:py-28 bg-white/70">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Card 1: Phone */}
                        <motion.div 
                            className="p-8 bg-white rounded-xl shadow-xl border-l-4 border-[#8B4513] hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                            variants={itemVariants}
                        >
                            <FaPhone size={30} className={`mb-4 text-[${ACCENT_COLOR}]`} />
                            <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">Dedicated Hotline</h3>
                            <p className="text-gray-700 text-lg font-semibold mb-2">+880 1XXXXXXXXX</p>
                            <p className="text-gray-500 text-sm">For immediate Premium support and consultation.</p>
                        </motion.div>

                        {/* Card 2: Email */}
                        <motion.div 
                            className="p-8 bg-white rounded-xl shadow-xl border-l-4 border-[#8B4513] hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                            variants={itemVariants}
                        >
                            <FaEnvelope size={30} className={`mb-4 text-[${ACCENT_COLOR}]`} />
                            <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">General Inquiry</h3>
                            <p className="text-gray-700 text-lg font-semibold mb-2">support@togetherever.com</p>
                            <p className="text-gray-500 text-sm">Response within 24 hours for all general queries.</p>
                        </motion.div>

                        {/* Card 3: Address */}
                        <motion.div 
                            className="p-8 bg-white rounded-xl shadow-xl border-l-4 border-[#8B4513] hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                            variants={itemVariants}
                        >
                            <FaMapMarkerAlt size={30} className={`mb-4 text-[${ACCENT_COLOR}]`} />
                            <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">Corporate Office</h3>
                            <p className="text-gray-700 text-lg font-semibold mb-2">Gulshan, Dhaka, Bangladesh</p>
                            <p className="text-gray-500 text-sm">By appointment only for face-to-face consultation.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            
            {/* --- */}

            {/* 3. The Message Form (Side by Side with Decorative Image) */}
            <section className="py-24 md:py-36 bg-[#FDF9F3]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        className="bg-white rounded-3xl shadow-3xl overflow-hidden flex flex-col lg:flex-row border-4 border-[#A0522D]/30"
                        variants={formVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Left Side: Decorative Image */}
                        <div className="relative h-64 lg:h-auto lg:w-1/3 bg-[#A0522D]">
                            <Image
                                src="/images/contact-decor.jpg" // একটি মার্জিত ডেকোরেটিভ ইমেজ
                                alt="Contact Illustration"
                                fill
                                className="object-cover opacity-80"
                            />
                            {/* Overlay Title */}
                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                 <h2 className="text-3xl font-serif font-bold text-white tracking-wider">Leave a Message</h2>
                             </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="p-10 md:p-16 lg:w-2/3">
                            <h3 className="text-3xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-3">
                                <FaCommentDots className={`text-[${PRIMARY_COLOR}]`} /> Send Us Your Inquiry
                            </h3>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <input
                                    type="text"
                                    placeholder="Your Full Name"
                                    className="p-3 border-2 border-gray-200 rounded-lg focus:border-[#A0522D] focus:ring-1 focus:ring-[#A0522D] transition-all duration-300"
                                    required
                                />
                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Your Email Address"
                                    className="p-3 border-2 border-gray-200 rounded-lg focus:border-[#A0522D] focus:ring-1 focus:ring-[#A0522D] transition-all duration-300"
                                    required
                                />
                                {/* Subject / Service */}
                                <select
                                    className="p-3 border-2 border-gray-200 rounded-lg focus:border-[#A0522D] focus:ring-1 focus:ring-[#A0522D] transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option value="" disabled selected>Select Inquiry Type</option>
                                    <option value="premium">Premium Membership</option>
                                    <option value="profile">Profile/Verification Help</option>
                                    <option value="general">General Question</option>
                                </select>
                                {/* Phone Number */}
                                <input
                                    type="tel"
                                    placeholder="Phone Number (Optional)"
                                    className="p-3 border-2 border-gray-200 rounded-lg focus:border-[#A0522D] focus:ring-1 focus:ring-[#A0522D] transition-all duration-300"
                                />
                                {/* Message */}
                                <textarea
                                    placeholder="Your Detailed Message"
                                    rows="5"
                                    className="md:col-span-2 p-3 border-2 border-gray-200 rounded-lg focus:border-[#A0522D] focus:ring-1 focus:ring-[#A0522D] transition-all duration-300"
                                    required
                                ></textarea>
                                
                                {/* Submit Button */}
                                <div className="md:col-span-2 text-center mt-4">
                                    <motion.button
                                        type="submit"
                                        className={`px-10 py-3 bg-[${PRIMARY_COLOR}] hover:bg-[${ACCENT_COLOR}] text-white font-semibold rounded-lg shadow-xl transition-all duration-300 uppercase tracking-widest text-base`}
                                        whileHover={{ scale: 1.02, boxShadow: "0 8px 15px rgba(139, 69, 19, 0.5)" }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Send Message
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- */}

            {/* 4. Office Hours and Consultation Policy */}
            <section className="py-20 bg-[#F8F5F1]">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-4xl font-serif font-bold text-stone-800 mb-6 flex items-center justify-center gap-3">
                        <FaClock className={`text-[${ACCENT_COLOR}]`} /> Office Hours
                    </h2>
                    <motion.div 
                        className="bg-white p-8 rounded-xl shadow-lg inline-block border-2 border-dashed border-[#8B4513]/50"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <p className="text-xl font-semibold text-gray-700 mb-3">Monday - Friday: 10:00 AM – 6:00 PM (BST)</p>
                        <p className="text-lg text-gray-600 mb-4">Saturday: 10:00 AM – 2:00 PM</p>
                        
                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2 flex items-center justify-center gap-2">
                                <FaUserTie className={`text-[${PRIMARY_COLOR}]`} /> Premium Consultations
                            </h3>
                            <p className="text-md text-gray-500">
                                Dedicated support for Premium members is available 24/7 via the exclusive member portal.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* --- */}

            {/* 5. Google Map Embed (Placeholder for location visual) */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <h2 className="text-4xl font-serif font-bold text-center text-stone-800 mb-8">Our Location</h2>
                    <motion.div 
                        className="w-full h-96 bg-gray-200 rounded-3xl shadow-xl overflow-hidden border-4 border-[#8B4513]/30"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                        whileHover={{ scale: 1.005 }}
                    >
                        {/* এটি হবে আপনার আসল Google Map Embed iframe */}
                        <div className="flex items-center justify-center w-full h-full text-stone-600 font-serif text-2xl bg-gray-100">
                            [Google Map Embed Placeholder for Physical Office]
                        </div>
                    </motion.div>
                </div>
            </section>

        </motion.div>
    );
};

export default ContactUs;