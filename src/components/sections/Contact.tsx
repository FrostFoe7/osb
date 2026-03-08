import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("আপনার বার্তা পাঠানো হয়েছে।", {
      className: "bg-brand-900 border-gold-500/30 text-brand-50 rounded-2xl",
    });
  };

  const contactInfos = [
    {
      icon: <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-gold-400" />,
      title: "আমাদের ঠিকানা",
      desc: "খুলনা বিভাগ, বাংলাদেশ",
    },
    {
      icon: <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-gold-400" />,
      title: "হটলাইন নম্বর",
      desc: "+880 1889 333859",
    },
    {
      icon: <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-gold-400" />,
      title: "ইমেইল ঠিকানা",
      desc: "info@osbfoundation.org",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-brand-50/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-50 inline-block pb-2">
            যোগাযোগ করুন
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gold-500 mx-auto mt-2 md:mt-4 rounded-full opacity-80"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <p className="text-brand-100/80 text-lg">
              আপনার যেকোনো জিজ্ঞাসা, পরামর্শ বা সহায়তার জন্য আমাদের সাথে যোগাযোগ
              করতে পারেন।
            </p>
            {contactInfos.map((info, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 md:gap-6 glass-card-dark p-4 md:p-6 rounded-xl md:rounded-2xl"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gold-500/20 rounded-full flex items-center justify-center border border-gold-500/30 flex-shrink-0">
                  {React.cloneElement(info.icon as React.ReactElement, {
                    className: "w-5 h-5 md:w-6 md:h-6 text-gold-400",
                  } as React.HTMLAttributes<SVGElement>)}
                </div>
                <div>
                  <h4 className="text-brand-50 font-bold text-base md:text-lg">
                    {info.title}
                  </h4>
                  <p className="text-[13px] md:text-base text-brand-100/60 mt-0.5 md:mt-1">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card-dark rounded-2xl md:rounded-[2rem] p-6 md:p-10">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-50 mb-5 md:mb-6">
              আমাদের বার্তা পাঠান
            </h3>
            <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
              <Input
                className="w-full bg-brand-950/40 border-brand-50/10 rounded-xl h-12 md:h-14 text-sm md:text-base text-brand-50 focus:border-gold-500"
                placeholder="আপনার নাম"
                required
              />
              <Input
                type="email"
                className="w-full bg-brand-950/40 border-brand-50/10 rounded-xl h-12 md:h-14 text-sm md:text-base text-brand-50 focus:border-gold-500"
                placeholder="ইমেইল অ্যাড্রেস"
                required
              />
              <Textarea
                rows={4}
                className="w-full bg-brand-950/40 border-brand-50/10 rounded-xl p-4 text-sm md:text-base text-brand-50 focus:border-gold-500 resize-none"
                placeholder="আপনার বার্তা লিখুন..."
                required
              />
              <Button
                type="submit"
                variant="outline"
                className="w-full bg-brand-900/40 backdrop-blur-md border border-gold-500/30 text-gold-50 h-14 md:h-16 rounded-2xl font-bold hover:bg-brand-900/80 hover:border-gold-400 text-base md:text-lg active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.05)]"
              >
                বার্তা পাঠান
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
