import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photos } from "@/data/db";

interface PhotosProps {
    onBack: () => void;
}

const Photos: React.FC<PhotosProps> = ({ onBack }) => {

    return (
        <div
            id="page-photos-list"
            className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen animate-fade-in"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button
                    onClick={onBack}
                    variant="outline"
                    className="mb-8 inline-flex items-center gap-2 text-gold-400 hover:text-brand-50 transition-colors border-gold-500/30 px-5 py-2 rounded-full bg-brand-50/5 h-auto text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> ফিরে যান
                </Button>
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-50 pb-2">
                        আমাদের কার্যক্রমের ছবি
                    </h2>
                    <div className="w-16 h-1 bg-gold-500 mx-auto mt-2 md:mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                    {photos.map((src, idx) => (
                        <div key={idx} className="overflow-hidden rounded-xl md:rounded-2xl border border-brand-50/10 hover:border-gold-500/30 transition-colors group">
                            <img
                                src={src}
                                className="w-full h-40 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                                alt={`Activity ${idx + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Photos;
