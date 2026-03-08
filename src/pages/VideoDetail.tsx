import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { videos } from "@/data/db";
import type { VideoItem } from "@/data/db";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

const VideoDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<VideoItem | undefined>(undefined);

    useEffect(() => {
        const foundVideo = videos.find((v) => v.id === id);
        setVideo(foundVideo);
    }, [id]);

    if (!video) {
        return (
            <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-brand-50 mb-4">ভিডিওটি খুঁজে পাওয়া যায়নি</h2>
                <Button onClick={() => navigate("/videos")} variant="outline">
                    ভিডিও গ্যালারিতে ফিরে যান
                </Button>
            </div>
        );
    }

    // Determine provider for Plyr
    const isYouTube = video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be");

    // Extract YouTube ID if applicable
    const getYouTubeID = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const plyrSource: any = isYouTube ? {
        type: "video",
        sources: [
            {
                src: getYouTubeID(video.videoUrl),
                provider: "youtube",
            },
        ],
    } : {
        type: "video",
        sources: [
            {
                src: video.videoUrl,
                type: "video/mp4",
            },
        ],
    };

    return (
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen bg-brand-950 animate-fade-in">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <Button
                        onClick={() => navigate("/videos")}
                        variant="outline"
                        className="inline-flex items-center gap-2 text-gold-400 hover:text-brand-50 transition-colors border-gold-500/30 px-5 h-11 rounded-xl bg-brand-50/5"
                    >
                        <ArrowLeft className="w-5 h-5" /> গ্যালারিতে ফিরুন
                    </Button>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-gold-500/20 text-gold-500 hover:bg-gold-500/10">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="glass-card-dark rounded-3xl overflow-hidden shadow-2xl border border-brand-50/10 mb-8 overflow-hidden group">
                    <div className="aspect-video bg-black relative">
                        <Plyr source={plyrSource} options={{
                            autoplay: false,
                            quality: {
                                default: 720,
                                options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
                            }
                        }} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-serif font-bold text-brand-50 leading-tight mb-4">
                            {video.title}
                        </h1>
                        <div className="flex items-center gap-2 text-gold-500/60 font-medium bg-gold-500/5 px-4 py-2 rounded-full w-fit">
                            <Info className="w-4 h-4" />
                            <span className="text-xs md:text-sm">OSB ফাউন্ডেশন প্রজেক্ট আর্কাইভ</span>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 glass-card-dark rounded-3xl border border-gold-500/10">
                        <p className="text-brand-100/80 leading-relaxed text-sm md:text-lg italic">
                            "দান মানুষের সম্পদ কমায় না, বরং এর মধ্যে বরকত দান করে।" — আপনাদের সামান্য সহযোগিতা পৌঁছে দিচ্ছে হাসি অনেক সুবিধাবঞ্চিত মানুষের মুখে। ভিডিওটি শেয়ার করে আমাদের পাশে দাঁড়ান।
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <Button
                            onClick={() => navigate("/zakat")}
                            className="bg-gold-500 text-brand-950 font-bold h-14 rounded-2xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20"
                        >
                            আপনার জাকাত হিসাব করুন
                        </Button>
                        <Button
                            onClick={() => navigate("/")}
                            variant="outline"
                            className="border-gold-500/30 text-gold-50 h-14 rounded-2xl hover:bg-gold-500/10 transition-all"
                        >
                            সব প্রজেক্ট দেখুন
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetail;
