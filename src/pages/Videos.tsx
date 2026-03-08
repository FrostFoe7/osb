import React from "react";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { videos } from "@/data/db";

interface VideosProps {
    onBack: () => void;
}

const Videos: React.FC<VideosProps> = ({ onBack }) => {

    return (
        <div
            id="page-videos-list"
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
                        আমাদের ভিডিও গ্যালারি
                    </h2>
                    <div className="w-16 h-1 bg-gold-500 mx-auto mt-2 md:mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="glass-card-dark rounded-3xl overflow-hidden group cursor-pointer"
                        >
                            <div className="h-48 md:h-56 bg-brand-950 relative flex items-center justify-center">
                                <img
                                    src={video.image}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                    alt={video.title}
                                />
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-gold-500/90 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 md:w-6 md:h-6 text-brand-950 fill-current ml-1" />
                                </div>
                            </div>
                            <div className="p-5 md:p-6">
                                <h3 className="font-serif font-bold text-lg md:text-xl text-brand-50">
                                    {video.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Videos;
