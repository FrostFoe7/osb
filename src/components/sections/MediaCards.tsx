import React from "react";
import { Play, ArrowRight, BookMarked, Feather } from "lucide-react";

interface MediaCardsProps {
  onNavigate: (pageId: string) => void;
}

const MediaCards: React.FC<MediaCardsProps> = ({ onNavigate }) => {
  const cards = [
    {
      id: "page-videos-list",
      title: "ভিডিও",
      subtitle: "আমাদের কার্যক্রমের ভিডিও",
      image:
        "https://images.unsplash.com/photo-1593113512613-333e8b0a9cb3?auto=format&fit=crop&q=80&w=800",
      icon: (
        <Play className="w-6 h-6 text-gold-400 fill-current group-hover:text-brand-950 ml-1" />
      ),
      videoStyle: true,
    },
    {
      id: "page-photos-list",
      title: "ছবিসমূহ",
      subtitle: "আমাদের কার্যক্রমের ছবি",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "page-blogs-list",
      title: "ব্লগসমুহ",
      subtitle: "আমাদের কার্যক্রম নিয়ে প্রবন্ধ",
      icon: (
        <Feather className="w-10 h-10 text-gold-400 relative z-10 group-hover:-translate-y-2 transition-transform" />
      ),
      blogStyle: true,
    },
  ];

  return (
    <section id="media" className="py-24 border-t border-brand-50/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-50 inline-block pb-2">
            সাদাকাহ সম্পর্কে বিভিন্ন কথা
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-4 rounded-full opacity-80 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => onNavigate(card.id)}
              className="glass-card-dark rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-gold-500/30 cursor-pointer group hover:-translate-y-2"
            >
              <div
                className={`h-60 relative overflow-hidden ${card.blogStyle ? "bg-brand-900/30 flex items-center justify-center" : "bg-brand-950 flex items-center justify-center"}`}
              >
                {card.blogStyle ? (
                  <>
                    <BookMarked className="w-32 h-32 text-gold-500/10 absolute group-hover:scale-110 transition-transform duration-700" />
                    {card.icon}
                  </>
                ) : (
                  <>
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`absolute inset-0 w-full h-full object-cover ${card.videoStyle ? "opacity-50" : "opacity-80"} group-hover:scale-105 transition-transform duration-700`}
                    />
                    {card.videoStyle && (
                      <div className="w-16 h-16 bg-brand-900/80 backdrop-blur-md rounded-full flex items-center justify-center border border-gold-500/30 z-10 group-hover:bg-gold-500 group-hover:text-brand-950 transition-all">
                        {card.icon}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="p-8 flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-brand-50 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-brand-100/70 font-light text-sm">
                    {card.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gold-500 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaCards;
