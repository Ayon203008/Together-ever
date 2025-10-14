"use client";
import { useState } from "react";
import { FaQuestionCircle, FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="py-20 bg-gray-50 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
              >
                <div className="flex items-center gap-4 text-gray-800 text-lg md:text-xl font-semibold">
                  <FaQuestionCircle className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                  {faq.question}
                </div>
                <span className="text-blue-600 text-lg md:text-xl">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-700 text-sm md:text-base"
                  >
                    {faq.answer}
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
