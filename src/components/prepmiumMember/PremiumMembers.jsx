"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCrown, FaMapMarkerAlt, FaCalendarAlt, FaTransgender } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


const PRIMARY_COLOR = '#8B4513';
const ACCENT_COLOR = '#A0522D';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const PremiumMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
   const router=useRouter()
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPremiumMembers() {
      try {
        const res = await fetch("/api/biodatas/premium");
        const data = await res.json(); 
        setMembers(Array.isArray(data) ? data : []); 
      } catch (err) {
        console.error("Failed to fetch premium members:", err);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPremiumMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FDF9F3]">
        <div className="loader border-4 border-t-4 border-gray-200 ease-linear rounded-full border-t-[#8B4513] h-12 w-12 mb-4 animate-spin"></div>
        <p className="text-gray-700 text-lg font-serif ml-4">Loading exclusive profiles...</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <section className="bg-[#FDF9F3] py-24 md:py-36 min-h-[50vh]">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-5xl font-extrabold font-serif text-stone-800 mb-6">
            Premium Profiles
          </h2>
          <p className="text-xl text-gray-600">No premium members found at this moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FDF9F3] py-20 md:py-28 relative overflow-hidden"> 
      {/* Decorations */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-90 pointer-events-none z-0">
        <Image src="/images/flower3.png" alt="Decorative Right" fill className="object-contain" priority/>
      </div>
      <div className="absolute bottom-0 left-0 w-[50px] h-[100px] lg:w-[600px] lg:h-[600px] rotate-270 opacity-100 pointer-events-none z-0">
        <Image src="/images/flower2.png" alt="Decorative Left" fill className="object-contain" priority/>
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-20 max-w-7xl relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <FaCrown size={40} className="mx-auto mb-3 text-[#A0522D] drop-shadow-md"/>
          <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-stone-900 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#A0522D]">Exclusive</span> Profiles
          </h2>
          <p className="text-lg text-gray-700 mt-2 max-w-3xl mx-auto">
            Discover the handpicked selection of our most serious and verified members.
          </p>
        </div>

        {/* Members Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
          variants={containerVariants} initial="hidden" animate="show"
        >
          {members.map((member) => (
            <motion.div
              key={member._id}
              className={`bg-white shadow-lg rounded-2xl overflow-hidden border-t-4 border-l-2 border-r-2 border-b-2 border-[${ACCENT_COLOR}]/50 hover:border-[${PRIMARY_COLOR}] transform transition duration-500 p-6 flex flex-col items-center`}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              {/* Premium Ribbon */}
              {member.isPremium && (
                <div className={`absolute top-0 right-0 bg-[${ACCENT_COLOR}] text-white text-xs font-semibold py-1 px-3 rounded-bl-lg shadow-md z-10`}>
                  PREMIUM
                </div>
              )}

              {/* Image */}
              <div className="relative w-32 h-32 mb-4 rounded-full border-2 border-[${PRIMARY_COLOR}] overflow-hidden bg-gray-200">
                <Image
                  src={member.profileImage || "/images/default-avatar.png"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <FaCrown size={20} className="absolute top-1 right-1 text-yellow-500"/>
              </div>

              {/* Name & Occupation */}
              <h3 className="text-2xl font-serif font-bold text-stone-800 mb-1">{member.name || 'N/A'}</h3>
              <p className="text-lg font-medium italic text-gray-600 mb-4">{member.occupation || 'N/A'}</p>

              {/* Details */}
              <div className="space-y-2 text-left mb-4 w-full">
                <p className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                  <FaMapMarkerAlt size={14} className={`text-[${ACCENT_COLOR}]`}/> 
                  Division: <span className="font-normal text-gray-800">{member.permanentDivision || 'N/A'}</span>
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                  <FaCalendarAlt size={14} className={`text-[${ACCENT_COLOR}]`}/> 
                  Age: <span className="font-normal text-gray-800">{member.age || 'N/A'}</span>
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                  <FaTransgender size={14} className={`text-[${ACCENT_COLOR}]`}/> 
                  Type: <span className="font-normal text-gray-800">{member.biodataType || 'N/A'}</span>
                </p>
              </div>

              {/* Button */}
            
                    <button
                      onClick={() => {
                        if (!session) {
                          router.push("/login"); // 🔒 লগইন না থাকলে login পেজে পাঠাও
                        } else {
                          router.push(`/biodatas/${bio._id}`); // ✅ লগইন থাকলে details পেজে যাও
                        }
                      }}
                      className="mt-4 px-8 py-3 bg-[#8B4513] hover:bg-[#A0522D] text-white rounded-lg shadow-xl hover:scale-[1.05] transition-transform duration-300 font-bold uppercase text-base tracking-widest w-full"
                    >
                      View Details
                    </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumMembers;
