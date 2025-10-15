"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping, FaLightbulb, FaLock, FaUserFriends, FaRegCheckCircle, FaStar } from 'react-icons/fa';
import Link from 'next/link';

// আপনার থিমের প্রধান রং
const PRIMARY_COLOR = '#8B4513'; // Saddle Brown
const ACCENT_COLOR = '#A0522D';  // Sienna

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const pulseGlow = {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
        duration: 3,
        repeat: Infinity,
    }
};


const AboutUs = () => {
    return (
        <motion.div 
            className="bg-[#FDF9F3] min-h-screen"
            initial="hidden"
            animate="show"
            variants={containerVariants}
        >
            
            {/* 1. Hero Section - The Grand Introduction (Wider and Animated) */}
            <motion.section 
                className="relative py-32 md:py-48 overflow-hidden"
                variants={itemVariants}
            >
                {/* Parallax Background Element 1 (Subtle Shine) */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/5 to-transparent z-0"
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.5 }}
                />
                
                {/* Decorative Floral Background (Animated) */}
                <motion.div
                    className="absolute top-0 right-0 w-[450px] h-[450px] opacity-70 pointer-events-none z-0"
                    initial={{ rotate: 10, scale: 0.8, x: 100 }}
                    animate={{ rotate: 0, scale: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
                >
                    <Image
                        src="/images/flower2.png" // আপনার হিরো সেকশনের ফুল
                        alt="Floral Decor"
                        fill
                        className="object-contain"
                    />
                </motion.div>

                <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
                    <motion.p 
                        className="text-2xl font-serif italic text-gray-600 mb-6 tracking-wider"
                        variants={textReveal}
                    >
                        Where Destiny Meets Design
                    </motion.p>
                    <motion.h1 
                        className="text-7xl md:text-9xl font-serif font-extrabold text-stone-900 leading-none mb-8 drop-shadow-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, type: "tween" }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#A0522D] drop-shadow-md">TogetherEver</span>
                        <br />
                        Excellence
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-gray-700 max-w-4xl mx-auto mt-8"
                        variants={textReveal}
                    >
                        We are not just a platform; we are the **architects of everlasting bonds**, merging **cutting-edge security** with the timeless elegance of traditional matchmaking. Discover the gold standard of commitment.
                    </motion.p>
                </div>
            </motion.section>

            {/* --- */}

            {/* 2. Our Vision and Core Values (Animated Grid) */}
            <section className="py-24 md:py-36 bg-white/70 backdrop-blur-sm border-t-4 border-b-4 border-[#8B4513]/20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        className="text-center mb-16"
                        variants={textReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <FaStar size={45} className={`mx-auto mb-4 text-[${ACCENT_COLOR}] animate-bounce-slow`} />
                        <h2 className="text-5xl font-serif font-bold text-stone-800 mb-4">The Pillars of Our Promise</h2>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Value 1 */}
                        <motion.div 
                            className="p-8 bg-white rounded-2xl shadow-2xl border-b-8 border-[#A0522D] transform hover:scale-105 transition-transform duration-500 relative overflow-hidden group"
                            variants={itemVariants}
                        >
                             <div className="absolute inset-0 bg-gradient-to-t from-[#A0522D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <FaHeart size={40} className={`mx-auto mb-4 text-[${ACCENT_COLOR}]`} />
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Certified Authenticity</h3>
                            <p className="text-gray-600">Every profile is meticulously verified. We promise a community free from ambiguity, focusing only on the most sincere candidates for life partnership.</p>
                        </motion.div>
                        
                        {/* Value 2 */}
                        <motion.div 
                            className="p-8 bg-white rounded-2xl shadow-2xl border-b-8 border-[#A0522D] transform hover:scale-105 transition-transform duration-500 relative overflow-hidden group"
                            variants={itemVariants}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-[#A0522D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <FaLock size={40} className={`mx-auto mb-4 text-[${ACCENT_COLOR}]`} />
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Military-Grade Privacy</h3>
                            <p className="text-gray-600">Leveraging advanced encryption and strict access control, your biodata is guarded with the highest level of confidentiality. Your journey is private and protected.</p>
                        </motion.div>
                        
                        {/* Value 3 */}
                        <motion.div 
                            className="p-8 bg-white rounded-2xl shadow-2xl border-b-8 border-[#A0522D] transform hover:scale-105 transition-transform duration-500 relative overflow-hidden group"
                            variants={itemVariants}
                        >
                             <div className="absolute inset-0 bg-gradient-to-t from-[#A0522D]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <FaHandsHelping size={40} className={`mx-auto mb-4 text-[${ACCENT_COLOR}]`} />
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Elite Concierge Service</h3>
                            <p className="text-gray-600">Beyond algorithms, our human Matchmaking Specialists offer bespoke guidance, ensuring a curated and discreet experience tailored to your elite criteria.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- */}

            {/* 3. Team & Expertise (Elevated Testimonial Card) */}
            <motion.section 
                className="py-24 bg-[#FDF9F3]"
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-white rounded-[40px] p-12 md:p-16 shadow-3xl border-l-8 border-r-8 border-[#8B4513]/50 flex flex-col md:flex-row items-center gap-10 relative">
                        
                        {/* Floating Decorative Element (Gold Leaf Effect) */}
                        <motion.div 
                            className="absolute top-[-20px] left-[-20px] w-20 h-20 text-[#A0522D]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                             <FaStar size={20} className="absolute top-2 left-2"/>
                             <FaStar size={15} className="absolute bottom-4 right-4"/>
                        </motion.div>
                        
                        <div className="relative w-48 h-48 flex-shrink-0 shadow-2xl transform rotate-[-2deg]">
                            {/* এখানে আপনার ম্যানেজিং টিমের ছবি থাকতে পারে */}
                            <Image 
                                src="/images/team-leader.jpg" 
                                alt="Team Expertise"
                                fill
                                className="object-cover rounded-full border-8 border-[#A0522D]/70 hover:border-[#8B4513] transition-colors duration-500"
                            />
                        </div>

                        <div className="text-left md:ml-6">
                            <h3 className="text-4xl font-serif font-extrabold text-stone-800 mb-4 tracking-tight">Decades of Matchmaking Mastery</h3>
                            <p className="text-gray-700 italic mb-4 text-lg border-l-4 border-gray-300 pl-4">
                                "Our leadership team comprises generational matchmakers and data scientists who have collectively engineered thousands of successful marriages. TogetherEver is where legacy meets precision."
                            </p>
                            <p className="text-xl font-semibold text-stone-800 flex items-center gap-3">
                                <FaUserFriends className={`text-[${ACCENT_COLOR}]`} size={24} /> The Executive Board, TogetherEver
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* --- */}
            
            {/* 4. Global Impact & Testimonials (Animated Grid) */}
            <section className="py-24 bg-[#F8F5F1]">
                 <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        className="text-center mb-16"
                        variants={textReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <h2 className="text-5xl font-serif font-bold text-stone-800 mb-2">Our Legacy of Love</h2>
                        <p className="text-gray-600 text-lg">Hear from the couples who trusted our meticulous process.</p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Testimonial 1 */}
                        {['"Truly built with care and integrity. We are forever grateful."', '"A service that understands tradition with a modern touch."', '"Unparalleled privacy and the best matches in the country."'].map((quote, index) => (
                            <motion.div 
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-xl relative border-b-4 border-[#A0522D]/70 transform hover:translate-y-[-5px] transition-transform duration-300"
                                variants={itemVariants}
                            >
                                <svg className={`w-10 h-10 mx-auto mb-4 text-[${ACCENT_COLOR}] opacity-70`} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 14h-4c-1.104 0-2-.896-2-2v-3c0-1.657 1.343-3 3-3h3v2h-3c-.552 0-1 .448-1 1v1c0 .552.448 1 1 1h4l1-1v2l-1 1zM20 14h-4c-1.104 0-2-.896-2-2v-3c0-1.657 1.343-3 3-3h3v2h-3c-.552 0-1 .448-1 1v1c0 .552.448 1 1 1h4l1-1v2l-1 1z"/>
                                </svg>
                                <p className="text-lg italic text-gray-700 mb-4 leading-relaxed">{quote}</p>
                                <p className="text-md font-semibold text-stone-800 flex items-center justify-center gap-2">
                                    <FaRegCheckCircle className={`text-[${ACCENT_COLOR}]`} /> Happy Couple {index + 1}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- */}

            {/* 5. How It Works - The Elite Process (Visual Flow with Motion) */}
            <section className="py-24 md:py-36 bg-[#FDF9F3]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div 
                        className="text-center mb-16"
                        variants={textReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <h2 className="text-5xl font-serif font-bold text-stone-800 mb-2">The TogetherEver Process</h2>
                        <p className="text-gray-600 text-lg">A refined and secure three-step path to your chosen partner.</p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row justify-between items-stretch relative">
                        {/* Connecting Line with Animation (Vertical on Mobile) */}
                        <motion.div 
                            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-[#A0522D]/30 hidden md:block"
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                        />
                        {/* Connecting Line (Horizontal on Mobile) */}
                         <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#A0522D]/30 -translate-y-1/2 md:hidden"></div>


                        {/* Step 1 */}
                        <motion.div 
                            className="w-full md:w-1/3 text-center relative z-10 p-6"
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className={`w-16 h-16 rounded-full bg-[${PRIMARY_COLOR}] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-5 shadow-xl transition-all duration-300 hover:bg-white hover:text-[${PRIMARY_COLOR}] border-4 border-[${PRIMARY_COLOR}]`}>1</div>
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Curated Entry</h3>
                            <p className="text-gray-600">Complete your comprehensive, identity-verified biodata. Quality ensures quality within our network.</p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div 
                            className="w-full md:w-1/3 text-center relative z-10 p-6 md:mt-24"
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className={`w-16 h-16 rounded-full bg-[${PRIMARY_COLOR}] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-5 shadow-xl transition-all duration-300 hover:bg-white hover:text-[${PRIMARY_COLOR}] border-4 border-[${PRIMARY_COLOR}]`}>2</div>
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">AI-Powered Synergy</h3>
                            <p className="text-gray-600">Our proprietary matching engine suggests partners based on deep compatibility scores, not just surface-level data.</p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div 
                            className="w-full md:w-1/3 text-center relative z-10 p-6 md:-mt-24"
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className={`w-16 h-16 rounded-full bg-[${PRIMARY_COLOR}] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-5 shadow-xl transition-all duration-300 hover:bg-white hover:text-[${PRIMARY_COLOR}] border-4 border-[${PRIMARY_COLOR}]`}>3</div>
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">Discreet Introduction</h3>
                            <p className="text-gray-600">Establish secure, monitored contact, leading to a successful, well-planned introduction to families.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* --- */}

            {/* 6. CTA Section - Final Call to Action (The Phenomenal Closer) */}
            <section className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] py-24 md:py-32 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-repeat" style={{ backgroundImage: "url('/images/gold-pattern.svg')" }} />

                <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
                    <motion.div
                        animate={pulseGlow} 
                        className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                        <FaRegCheckCircle size={48} className="text-white drop-shadow-lg" />
                    </motion.div>
                    
                    <h2 className="text-5xl font-serif font-extrabold text-white mb-6 drop-shadow-md">
                        The Future of Your Family Starts Here.
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto drop-shadow">
                        Join the most exclusive matrimonial platform dedicated to creating timeless unions. Your extraordinary journey awaits.
                    </p>
                    <Link href="/signup">
                        <motion.button 
                            className={`px-12 py-4 bg-white text-[${ACCENT_COLOR}] font-extrabold rounded-xl shadow-2xl transition-all duration-300 uppercase tracking-widest text-lg hover:bg-stone-100 hover:scale-[1.05]`}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Enroll in Excellence
                        </motion.button>
                    </Link>
                </div>
            </section>

        </motion.div>
    );
};

export default AboutUs;