import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface PhotosListProps {
  onBack: () => void;
}

const PhotosList: React.FC<PhotosListProps> = ({ onBack }) => {
  const photos = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1593113512613-333e8b0a9cb3?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <div
      id="page-photos-list"
      className="pt-32 pb-24 min-h-screen animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 inline-flex items-center gap-2 text-gold-400 hover:text-brand-50 transition-colors border-gold-500/30 px-5 py-2 rounded-full bg-brand-50/5 h-auto"
        >
          <ArrowLeft className="w-4 h-4" /> ফিরে যান
        </Button>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-50 pb-2">
            আমাদের কার্যক্রমের ছবি
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((src, idx) => (
            <img
              key={idx}
              src={src}
              className="rounded-2xl w-full h-48 md:h-64 object-cover border border-brand-50/10 hover:scale-105 transition-transform cursor-pointer"
              alt={`Activity ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosList;
