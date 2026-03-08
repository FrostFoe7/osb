import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ZoomIn, Download, Share2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { photos } from "@/data/db";
import type { PhotoItem } from "@/data/db";

const PhotoDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<PhotoItem | undefined>(undefined);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const foundPhoto = photos.find((p) => p.id === id);
        setPhoto(foundPhoto);
    }, [id]);

    if (!photo) {
        return (
            <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-brand-50 mb-4">ছবিটি খুঁজে পাওয়া যায়নি</h2>
                <Button onClick={() => navigate("/photos")} variant="outline">
                    ছবি গ্যালারিতে ফিরে যান
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen bg-brand-950 animate-fade-in relative overflow-hidden">
            {/* Background Blur Effect */}
            <div
                className="absolute inset-0 opacity-20 blur-[100px] pointer-events-none -z-10"
                style={{ backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <Button
                        onClick={() => navigate("/photos")}
                        variant="outline"
                        className="inline-flex items-center gap-2 text-gold-400 hover:text-brand-50 transition-colors border-gold-500/30 px-5 h-11 rounded-xl bg-brand-50/5"
                    >
                        <ArrowLeft className="w-5 h-5" /> গ্যালারিতে ফিরুন
                    </Button>

                    <div className="flex items-center gap-2 md:gap-4">
                        <Button
                            variant="outline"
                            className="hidden sm:flex h-11 px-6 rounded-xl border-gold-500/20 text-gold-500 hover:bg-gold-500/10 gap-2 font-bold"
                            onClick={() => window.open(photo.url, '_blank')}
                        >
                            <Download className="w-4 h-4" /> ডাউনলোড
                        </Button>
                        <Button
                            variant="outline"
                            className="h-11 w-11 p-0 rounded-xl border-gold-500/20 text-gold-500 hover:bg-gold-500/10"
                        >
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div
                        className={`relative glass-card-dark rounded-3xl overflow-hidden shadow-2xl border border-brand-50/10 transition-all duration-500 ${isZoomed ? 'scale-105 shadow-gold-500/20' : ''}`}
                        onClick={() => setIsZoomed(!isZoomed)}
                    >
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            <div className="bg-brand-950/60 backdrop-blur-md p-2 rounded-lg border border-brand-50/10 text-brand-100 cursor-pointer hover:text-gold-400 transition-colors">
                                <Maximize2 className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="relative group cursor-zoom-in">
                            <img
                                src={photo.url}
                                className={`w-full h-auto max-h-[75vh] object-contain mx-auto transition-transform duration-700 ${isZoomed ? 'scale-110' : ''}`}
                                alt={photo.title || "OSB Activity"}
                            />
                            {!isZoomed && (
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <div className="bg-gold-500/90 text-brand-950 p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <ZoomIn className="w-6 h-6" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        {photo.title && (
                            <h1 className="text-2xl md:text-5xl font-serif font-bold text-brand-50 tracking-tight">
                                {photo.title}
                            </h1>
                        )}
                        <p className="text-brand-100/70 text-sm md:text-lg leading-relaxed font-medium">
                            অসচ্ছল মানুষের মুখে হাসি ফোটানোর এই মহতী কার্যক্রমে আপনাদের অংশগ্রহণই আমাদের পথচলার শক্তি। এই ছবিটি একটি সফল প্রকল্পের মুহূর্ত তুলে ধরছে।
                        </p>

                        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                            <Button
                                onClick={() => navigate("/donate")}
                                className="bg-gold-500 text-brand-950 font-bold px-10 h-14 rounded-2xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20"
                            >
                                সাহায্য করুন
                            </Button>
                            <Button
                                onClick={() => navigate("/")}
                                variant="outline"
                                className="border-gold-500/30 text-gold-50 px-10 h-14 rounded-2xl hover:bg-gold-500/10 transition-all"
                            >
                                হোমে ফিরে যান
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoDetail;
