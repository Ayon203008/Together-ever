import React from 'react';
import { BsQuote } from 'react-icons/bs';
import Image from 'next/image';

const testimonialsData = [
  {
    quote: "Through TogetherEver's detailed biodata filtering, I found a partner who perfectly matched my values. Our journey to a blissful marriage was seamless and stress-free!",
    name: 'Fahim & Adiba, Newlyweds',
    date: '5 days ago',
  },
  {
    quote: "Every step, from profile creation to final meeting, was handled with professionalism. Their secure platform made our big day feel magical. Highly recommended for finding true love.",
    name: 'Nadim & Zara, Happy Couple',
    date: '6 days ago',
  },
  {
    quote: "The personalized suggestions were outstanding, and the coordination was flawless. We felt so special. TogetherEver truly made our dream of a perfect match a reality!",
    name: 'Sami & Lima, Newlyweds',
    date: '1 week ago',
  },
];

const Testimonial = () => {
  return (
    <section className="bg-[#FDF9F3] py-20 md:py-32 relative overflow-hidden">
      
      {/* ডানদিকের পাতার নকশা - স্ক্রিনশট অনুযায়ী */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] pointer-events-none z-0">
        {/* আপনাকে এই পাতার ইমেজের পাথ পরিবর্তন করে দিতে হবে */}
        <Image 
          src={'/images/flower2.png'} 
          alt='Decorative Eucalyptus Leaf'
          fill
          className="object-contain transform rotate-12"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-24">
          {/* স্ক্রিনশটের মতো ডেকোরেটিভ আন্ডারলাইন */}
          <div className="flex justify-center mb-4">
            {/* এই আন্ডারলাইনটি একটি SVG/Image হতে পারে। এখানে আমি একটি SVG সিমুলেশন ব্যবহার করলাম। */}
            <svg width="150" height="20" viewBox="0 0 150 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10 C 30 2 40 18 75 10 C 110 2 120 18 145 10" stroke="#8B4513" strokeWidth="1.5"/>
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 tracking-wider">
            What Our Happy Clients Say
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 transition duration-300">
              
              {/* Quote Icon */}
              <BsQuote className="text-5xl text-[#8B4513] mb-6 transform -scale-x-100" />
              
              {/* Quote Text */}
              <p className="text-gray-700 italic mb-8 max-w-xs leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Author and Details */}
              <div className="w-full">
                <p className="text-lg font-serif font-semibold text-stone-800 mb-1">
                  — {testimonial.name}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  — {testimonial.date}
                </p>
                
                {/* Underline Separator */}
                <div className="h-px w-3/4 mx-auto bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;