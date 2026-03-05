import React from "react";
import { BellRing } from "lucide-react";

const NoticeBanner: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-8 md:-mt-12">
      <div className="glass-card-dark rounded-2xl shadow-[0_10px_30px_var(--color-brand-950)] p-1.5 flex items-center border border-gold-500/20 overflow-hidden">
        <div className="bg-brand-900 text-gold-400 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-sm font-bold flex-shrink-0 flex items-center gap-1.5 md:gap-2 h-full uppercase tracking-wider border border-gold-500/30">
          <BellRing className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400 animate-pulse" /> জরুরী
          <span className="hidden xs:inline">নোটিশ</span>
        </div>
        <div className="flex-1 px-3 sm:px-4 py-2 text-brand-100 font-medium text-xs sm:text-sm md:text-base overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap">
            OSB কাজ করছে খুলনা বিভাগের বিভিন্ন জেলাতে। প্রান্তিক গ্রাম গুলোতে
            আমরা চেষ্টা করছি অসহায় ও হতদরিদ্র পরিবারকে সাবলম্বী করার জন্য।
            আপনারা আপনাদের সর্বোচ্চ দিয়ে সহযোগিতা পাঠাতে পারেন। আপনার সাদাকাহ
            একটি পরিবারের হাসিমুখের কারণ।।
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBanner;
