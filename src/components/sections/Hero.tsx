import React from "react";
import { Sparkles, Star, Moon, HandCoins } from "lucide-react";
import { Button } from "../ui/button";

interface HeroProps {
  onDonateClick: () => void;
  onActivitiesClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDonateClick, onActivitiesClick }) => {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-44 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-950/80"></div>

      {/* Decorative Icons */}
      <div className="absolute top-24 left-10 lg:left-32 opacity-20 animate-float pointer-events-none">
        <Star className="w-16 h-16 text-gold-400 fill-current" />
      </div>
      <div className="absolute top-64 right-10 lg:right-32 opacity-20 animate-float-delayed pointer-events-none">
        <Moon className="w-20 h-20 text-gold-400 fill-current" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-brand-50/5 text-gold-100 border border-gold-500/20 mb-6 md:mb-10 backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400" />
          <span className="text-[12px] md:text-base font-medium tracking-wide">
            আপনার ২০ টাকার সাদাকাহ, কারো জীবনের স্বচ্ছতা
          </span>
        </div>

        <h1 className="font-serif text-[28px] sm:text-4xl md:text-6xl lg:text-7xl font-bold text-brand-50 mb-6 md:mb-8 leading-[1.3] md:leading-[1.2] tracking-tight">
          সদকাহ গুনাহ মুছে দেয়, <br className="hidden sm:block" />
          <span className="gold-gradient-text drop-shadow-sm">
            যেমন পানি আগুন নিভিয়ে দেয়
          </span>
        </h1>

        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10 opacity-80 hover:opacity-100 transition-opacity duration-500">
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold-500"></div>
          <p className="text-base md:text-2xl text-gold-300 font-serif italic tracking-wide">
            ( তিরমিজি ৬১৪ )
          </p>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold-500"></div>
        </div>

        <p className="max-w-3xl text-sm md:text-lg lg:text-xl text-brand-100/70 mb-10 md:mb-14 leading-relaxed font-light px-2 sm:px-0">
          এটি শুধু একটি সংখ্যা নয়, এটি ঐক্য ও সম্মিলিত মানবিকতার প্রতীক। আমাদের
          ছোট ছোট দান একত্রিত হয়ে সৃষ্টি করছে বড় বড় পরিবর্তনের গল্প। আপনার
          সামান্য দানের ঘুরে দাঁড়াতে পারে একটি পরিবার।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
          <Button
            onClick={onDonateClick}
            className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 text-brand-950 px-8 md:px-10 py-6 md:py-8 rounded-full font-bold text-base md:text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-[0_0_20px_var(--color-gold-500)]/30 hover:shadow-[0_0_30px_var(--color-gold-400)]/50 flex items-center justify-center gap-3 transform hover:-translate-y-1 h-auto active:scale-95"
          >
            <HandCoins className="w-5 h-5" />
            এখনই দান করুন
          </Button>
          <Button
            onClick={onActivitiesClick}
            variant="outline"
            className="w-full sm:w-auto bg-brand-50/5 border border-gold-500/30 text-gold-50 px-8 md:px-10 py-6 md:py-8 rounded-full font-bold text-base md:text-lg hover:bg-brand-50/10 hover:border-gold-400 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm h-auto active:scale-95"
          >
            কার্যক্রম সমুহ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
