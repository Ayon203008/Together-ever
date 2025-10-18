"use client";
import { useState } from "react";
import { FaQuestionCircle, FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Defined colors for a premium, earthy, and warm theme
const PRIMARY_COLOR = '#8B4513'; // Saddle Brown
const ACCENT_COLOR = '#A0522D';  // Sienna
const TEXT_DARK = '#4A2B0E';     // Darker brown for text
const BG_LIGHT = '#FDF9F3';     // Light creamy background

const faqs = [
  {
    question: "What is TogetherEver?",
    answer:
      "TogetherEver is a premium matrimony platform connecting singles looking for serious relationships and marriage.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Join Now' button on the top-right corner and fill in your basic details to get started.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Yes! We prioritize your privacy. All personal data is securely stored and not shared with third parties.",
      
  },
  {
    question: "Can I search for matches based on preferences?",
    answer:
      "Absolutely. You can filter potential matches based on age, location, religion, profession, and other preferences.",
  },
  {
    question: "Is TogetherEver free?",
    answer:
      "Registration is free, but we offer premium membership for advanced features and better match visibility.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-20 md:py-32 bg-[${BG_LIGHT}] px-4 md:px-12 relative overflow-hidden`}>
      
      {/* Top-left flower decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-60 pointer-events-none transform -translate-x-1/3 -translate-y-1/3 z-0">
          <Image 
              src="/images/flower2.png" // আপনার ফুলের ইমেজের পাথ
              alt="Floral Decoration Top Left" 
              fill 
              className="object-contain rotate-12" 
              sizes="30vw"
          />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className={`text-4xl md:text-5xl font-extrabold font-serif text-[${TEXT_DARK}] text-center mb-16 leading-tight`}>
           Have <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[${PRIMARY_COLOR}] to-[${ACCENT_COLOR}]`}>Questions</span>? We Have Answers.
        </h2>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 border-2 border-[${ACCENT_COLOR}]/20`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center p-6 md:p-8 text-left focus:outline-none group transition-colors duration-300 ${
                    openIndex === index 
                        ? `bg-[${ACCENT_COLOR}]/10 border-b-2 border-[${PRIMARY_COLOR}]/50` 
                        : `hover:bg-[${BG_LIGHT}]`
                }`}
              >
                <div className={`flex items-start gap-5 text-[${TEXT_DARK}] text-lg md:text-xl font-bold font-serif`}>
                  <FaQuestionCircle className={`text-[${PRIMARY_COLOR}] mt-1 text-2xl group-hover:text-[${ACCENT_COLOR}] transition-colors duration-300`} />
                  {faq.question}
                </div>
                <span className={`text-[${PRIMARY_COLOR}] text-2xl min-w-[24px]`}>
                  {openIndex === index 
                    ? <FaMinus className="rotate-0 transition-transform duration-300"/> 
                    : <FaPlus className="rotate-0 transition-transform duration-300"/>}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`px-6 md:px-8 pb-6 md:pb-8 pt-0 text-gray-700 text-base font-medium border-t border-gray-100`}
                  >
                    {/* Inner padding for the answer text to maintain gap */}
                    <div className="pt-4"> 
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}