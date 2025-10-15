import Image from 'next/image';
import React from 'react';

const OurStory = () => {
  const storyEvents = [
    {
      id: 1,
      date: 'June 15, 2014',
      title: 'How we gather?',
      description: 'At a family event, we met each other for the first time. Then our family thought we were perfect for each other. So they decided to marry us as soon as possible.',
      image: '/images/service-thumb2.png', // আপনার প্রথম ইমেজের পাথ
      align: 'right', // ইভেন্টটি টাইমলাইনের ডানদিকে থাকবে
    },
    {
      id: 2,
      date: 'June 25, 2016',
      title: 'Final family meeting',
      description: 'At a family event, we met each other for the first time. Then our family thought we were perfect for each other. So they decided to marry us as soon as possible.',
      image: '/images/service-thumb2.png', // আপনার দ্বিতীয় ইমেজের পাথ
      align: 'left', // ইভেন্টটি টাইমলাইনের বামদিকে থাকবে
    },
    {
      id: 3,
      date: 'June 25, 2023',
      title: 'Our engagement day',
      description: 'At a family event, we met each other for the first time. Then our family thought we were perfect for each other. So they decided to marry us as soon as possible.',
      image: '/images/service-thumb2.png', // আপনার তৃতীয় ইমেজের পাথ
      align: 'right', // ইভেন্টটি টাইমলাইনের ডানদিকে থাকবে
    },
  ];

  return (
    <section className="bg-[#FDF9F3] py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-lg font-serif italic text-gray-600 mb-2">Our story</p>
          <h2 className="text-5xl md:text-6xl font-serif text-stone-800 relative inline-block">
            How did it happen?
            {/* স্ক্রিনশটের মতো কার্লি আন্ডারলাইন */}
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-15px] w-[150px] h-3">
              {/* এটি একটি SVG বা ইমেজ হতে পারে। আপাতত একটি সরল বর্ডার বা কাস্টম শেপ ব্যবহার করা হলো। */}
              <svg className="w-full h-full" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5 C 20 1 30 9 50 5 C 70 1 80 9 99 5" stroke="#8B4513" strokeWidth="1.5"/>
              </svg>
            </span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 h-full"></div>

          {storyEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`mb-12 flex items-center w-full ${event.align === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className="w-1/2 flex justify-center relative">
                {/* Image & Decorative Frame */}
                {event.align === 'left' ? ( // বাম দিকের ইমেজের জন্য
                  <div className="w-[280px] h-[350px] relative bg-white border-2 border-[#8B4513] p-2 shadow-md">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    {/* декоративные элементы SVG বা ইমেজ হতে পারে */}
                    {/* স্ক্রিনশটের ফ্রেমের জন্য কাস্টম SVG/CSS */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-[#8B4513]"></div>
                    <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-[#8B4513]"></div>
                    {/* স্ক্রিনশটের মতো মাঝের কার্ভি ডিজাইন */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-12 h-10">
                        {/* <Image src="/images/frame-design.png" alt="frame design" layout="fill" /> */}
                        {/* Placeholder for SVG/Image decor */}
                    </div>
                  </div>
                ) : ( // ডান দিকের ইমেজের জন্য
                  <div className="w-[280px] h-[350px] relative bg-white border-2 border-[#8B4513] p-2 shadow-md">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    {/* декоративные элементы SVG বা ইমেজ হতে পারে */}
                     <div className="absolute -top-4 -right-4 w-10 h-10 border-t-2 border-r-2 border-[#8B4513]"></div>
                    <div className="absolute -bottom-4 -left-4 w-10 h-10 border-b-2 border-l-2 border-[#8B4513]"></div>
                    {/* স্ক্রিনশটের মতো মাঝের কার্ভি ডিজাইন */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-12 h-10">
                        {/* <Image src="/images/frame-design.png" alt="frame design" layout="fill" /> */}
                        {/* Placeholder for SVG/Image decor */}
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline Dot (Heart Icon) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                {/* এখানে হার্ট আইকন বা অন্য কোনো ডেকরেশন থাকবে */}
                <div className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm">
                  ❤️
                </div>
              </div>

              <div className="w-1/2 px-8">
                {/* Event Details */}
                <p className="text-gray-500 text-sm mb-2 font-semibold tracking-wider uppercase">{event.date}</p>
                <h3 className="text-3xl font-serif text-stone-800 mb-4">{event.title}</h3>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;