import React from "react";
import {
  TrendingUp,
  ShoppingBag,
  Hammer,
  Utensils,
  Backpack,
  Droplets,
  CloudSnow,
  LifeBuoy,
} from "lucide-react";

const Activities: React.FC = () => {
  const activities = [
    {
      icon: <TrendingUp className="w-7 h-7 text-gold-400 group-hover:text-gold-300 transition-colors" />,
      title: "স্বাবলম্বীকরণ",
    },
    {
      icon: <ShoppingBag className="w-7 h-7 text-brand-100" />,
      title: "রমাদান বাজার",
    },
    {
      icon: <Hammer className="w-7 h-7 text-gold-400" />,
      title: "পুনর্বাসন প্রকল্প",
    },
    {
      icon: <Utensils className="w-7 h-7 text-gold-400" />,
      title: "ইফতার বিতরণ",
    },
    {
      icon: <Backpack className="w-7 h-7 text-gold-400" />,
      title: "শিক্ষা সামগ্রী",
    },
    {
      icon: <Droplets className="w-7 h-7 text-brand-100" />,
      title: "টিউবওয়েল স্থাপন",
    },
    {
      icon: <CloudSnow className="w-7 h-7 text-brand-100" />,
      title: "শীতবস্ত্র বিতরণ",
    },
    {
      icon: <LifeBuoy className="w-7 h-7 text-brand-100" />,
      title: "দুর্যোগে ত্রাণ",
    },
  ];

  return (
    <section
      id="activities"
      className="py-16 md:py-24 border-t border-brand-50/5 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-50 inline-block pb-2">
            চলমান কার্যক্রম সমূহ
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gold-500 mx-auto mt-2 md:mt-4 rounded-full opacity-80"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="glass-card-dark rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col items-center justify-center text-center hover:bg-brand-50/5 transition-all"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 bg-brand-900/50 border border-brand-50/10 rounded-full flex items-center justify-center mb-3 md:mb-5">
                {activity.icon}
              </div>
              <p className="text-xs md:text-base text-brand-100/90 leading-relaxed font-medium group-hover:text-brand-50 transition-colors duration-500">
                {activity.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
