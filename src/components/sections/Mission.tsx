import React from "react";
import { ShoppingBasket, Home, BookOpen } from "lucide-react";

const Mission: React.FC = () => {
  const missions = [
    {
      icon: (
        <ShoppingBasket className="w-10 h-10 text-gold-500 group-hover:text-gold-400" />
      ),
      title: "খাদ্য",
      description: "অসহায় পরিবারের মাসিক বাজার",
    },
    {
      icon: (
        <Home className="w-10 h-10 text-gold-500 group-hover:text-gold-400" />
      ),
      title: "পুনর্বাসন",
      description: "হতদরিদ্রদের বাড়ির ব্যবস্থা করা",
    },
    {
      icon: (
        <BookOpen className="w-10 h-10 text-gold-500 group-hover:text-gold-400" />
      ),
      title: "শিক্ষা সামগ্রী",
      description: "সুবিধাবঞ্চিত শিশুদের শিক্ষা উপকরণ উপহার দেওয়া।",
    },
  ];

  return (
    <section id="mission" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-50 inline-block pb-2">
            আমাদের মিশন
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-4 rounded-full opacity-80 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {missions.map((item, index) => (
            <div
              key={index}
              className="glass-card-dark rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-brand-50/5 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-8 border border-gold-500/20 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-brand-50 group-hover:text-gold-400 transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-brand-100/60 leading-relaxed font-light group-hover:text-brand-100/90 transition-colors duration-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
