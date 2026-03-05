import React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

const Donate: React.FC = () => {
  const copyNumber = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("নাম্বার কপি করা হয়েছে!", {
        description: "বিকাশ স্যান্ড মানি করতে পারেন।",
        className: "bg-brand-900 border-gold-500/30 text-brand-50 rounded-2xl",
      });
    });
  };

  return (
    <section
      id="donate"
      className="py-16 md:py-24 relative overflow-hidden border-t border-brand-50/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.2] gold-gradient-text pb-2">
              সাদাকাহ পাঠান,
              <br />
              হাসি ফোটান
            </h2>
            <p className="text-lg text-brand-100/80 leading-relaxed font-light max-w-xl">
              যাদের সামর্থ্য আছে তারা সাধ্যমতো দান করুন। আপনার এই দান সম্পূর্ণ
              আমানতদারিতার সাথে পৌঁছে দেওয়া হবে।
            </p>
            <div className="flex flex-col gap-5 pt-2">
              {[
                "যাচাইকৃত দুস্থ পরিবার নির্বাচন",
                "নিয়মিত আপডেট প্রদান",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 text-brand-50">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/30 shrink-0">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold-400" />
                  </div>
                  <p className="text-sm md:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-dark bg-brand-900/40 rounded-[2rem] shadow-[0_0_50px_var(--color-brand-950)] relative mt-10 lg:mt-0 p-6 sm:p-8 md:p-12 pt-14 sm:pt-14">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <span className="bg-gold-500 text-brand-950 px-8 py-2.5 text-sm font-bold rounded-full">
                পারসোনাল নাম্বার
              </span>
            </div>
            <p className="text-center text-brand-100/50 font-bold mb-8 text-sm uppercase">
              যেকোনো মাধ্যম ব্যবহার করুন
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="bg-brand-50/5 p-1.5 md:p-2 rounded-xl backdrop-blur-sm border border-brand-50/10 hover:border-gold-500/30 transition-colors group">
                <img
                  src="/bkash.webp"
                  alt="bKash"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-brand-50/5 p-1.5 md:p-2 rounded-xl backdrop-blur-sm border border-brand-50/10 hover:border-gold-500/30 transition-colors group">
                <img
                  src="/nagad.webp"
                  alt="Nagad"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-brand-50/5 p-1.5 md:p-2 rounded-xl backdrop-blur-sm border border-brand-50/10 hover:border-gold-500/30 transition-colors group">
                <img
                  src="/rocket.webp"
                  alt="Rocket"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-brand-50/5 p-1.5 md:p-2 rounded-xl backdrop-blur-sm border border-brand-50/10 hover:border-gold-500/30 transition-colors group">
                <img
                  src="/upay.webp"
                  alt="Upay"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            </div>
            <button
              onClick={() => copyNumber("০১৮৮৯৩৩৩৮৫৯")}
              className="w-full border-2 md:border-[3px] border-dashed border-gold-500/30 bg-brand-950/50 hover:border-gold-500/60 rounded-2xl md:rounded-[1.5rem] p-6 md:p-10 transition-all flex flex-col items-center gap-4 md:gap-5 outline-none active:scale-95"
            >
              <span className="text-2xl xs:text-3xl sm:text-5xl font-serif font-bold text-gold-400 tracking-wider transition-all">
                ০১৮৮৯৩৩৩৮৫৯
              </span>
              <span className="text-[11px] md:text-sm font-bold text-gold-200 flex items-center gap-2 bg-brand-900/80 px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-gold-500/20">
                <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" /> ক্লিক করে কপি করুন
              </span>
            </button>
            <p className="text-sm text-brand-100/60 text-center mt-8 leading-relaxed">
              টাকা পাঠানোর পর অনুগ্রহ করে গ্রুপে আপডেট চেক করবেন। জাযাকাল্লাহু
              খাইরান।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
