import React from "react";

const Process: React.FC = () => {
  const steps = [
    {
      num: "১",
      title: "সাদাকাহ সংগ্রহ",
      description:
        "প্রতি মাসের ০৫ থেকে ১৫ তারিখের মধ্যে আমরা বিকাশ/নগদ এর মাধ্যমে সাদাকাহ সংগ্রহ করি।",
      gradient: "from-brand-800 to-brand-900",
      text: "text-brand-50",
    },
    {
      num: "২",
      title: "হিসাব ও আপডেট",
      description:
        "যে নাম্বার থেকে টাকা আসবে তার শেষের ৪ ডিজিট এবং টাকার পরিমাণ গ্রুপে পোস্ট আকারে জানিয়ে দেওয়া হয়।",
      gradient: "from-gold-600 to-gold-700",
      text: "text-brand-50",
    },
    {
      num: "৩",
      title: "বাস্তবায়ন",
      description:
        "উপযুক্ত ব্যক্তিকে খুঁজে বের করে স্বাবলম্বী করার উপকরণ কিনে দেওয়া হয় এবং বিস্তারিত আপডেট গ্রুপে দেওয়া হয়।",
      gradient: "from-brand-800 to-brand-900",
      text: "text-gold-400",
    },
  ];

  return (
    <section
      id="process"
      className="py-24 relative overflow-hidden border-t border-brand-50/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-3 block">
            কর্মপদ্ধতি
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-50 inline-block pb-2">
            কিভাবে কাজ করি আমরা?
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-4 rounded-full opacity-80"></div>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent -z-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center group relative">
                <div className="w-28 h-28 sm:w-36 h-36 bg-brand-950 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 border-[6px] border-brand-900 group-hover:border-gold-500/40 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] relative">
                  <div
                    className={`w-20 h-20 sm:w-24 h-24 bg-gradient-to-br ${step.gradient} border border-brand-50/10 ${step.text} rounded-full flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold group-hover:scale-105 transition-all duration-500 shadow-lg`}
                  >
                    {step.num}
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-gold-500/0 group-hover:border-gold-500/20 group-hover:scale-110 transition-all duration-700"></div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-brand-50 group-hover:text-gold-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-brand-100/70 leading-relaxed font-light text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
