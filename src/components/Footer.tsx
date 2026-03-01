import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-950 pt-16 sm:pt-20 pb-8 sm:pb-10 border-t-[4px] border-gold-500 relative overflow-hidden mt-24">
      <div className="absolute inset-0 bg-brand-950/20 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold-500/10 border-2 border-brand-900 rotate-3">
          <span className="font-serif font-bold text-4xl text-brand-950">
            O
          </span>
        </div>
        <h2 className="font-serif font-bold text-3xl text-brand-50 mb-4 tracking-wide">
          OSB Foundation
        </h2>
        <p className="text-brand-100/60 max-w-lg mx-auto mb-10 text-lg leading-relaxed font-light">
          আমাদের ছোট ছোট দান একত্রিত হয়ে সৃষ্টি করছে বড় বড় পরিবর্তনের গল্প।
          আপনার সামান্য দানে ঘুরে দাঁড়াতে পারে একটি পরিবার।
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-brand-100/40 mt-12 pt-8 border-t border-brand-50/10">
          <p>
            &copy; {new Date().getFullYear()} OSB Foundation. সর্বস্বত্ব
            সংরক্ষিত।
          </p>
          <p className="mt-4 md:mt-0 italic tracking-wider">
            "সদকাহ গুনাহ মুছে দেয়"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
