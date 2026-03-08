import type { BlogItem } from "@/types/blog";

export interface VideoItem {
    title: string;
    image: string;
}

export const videos: VideoItem[] = [
    {
        title: "রমাদান বাজার বিতরণ",
        image:
            "https://images.unsplash.com/photo-1593113512613-333e8b0a9cb3?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "সুবিধাবঞ্চিত শিশুদের শিক্ষা",
        image:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "টিউবওয়েল স্থাপন প্রজেক্ট",
        image:
            "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=800",
    },
];

export const photos: string[] = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1593113512613-333e8b0a9cb3?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&q=80&w=800",
];

export const blogs: BlogItem[] = [
    {
        id: "1",
        title: "সাদাকাহর মাধ্যমে কীভাবে একটি পরিবার ঘুরে দাঁড়ায়?",
        content:
            "আমাদের গত মাসের পুনর্বাসন প্রজেক্টের গল্প। যেখানে সামান্য কিছু অর্থের বিনিময়ে একটি নিঃস্ব পরিবার পেল বাঁচার নতুন অবলম্বন। সমাজকে এগিয়ে নিতে এই ছোট ছোট অবদানগুলো অনেক বড় ভূমিকা পালন করে...",
        date: "১৫ মার্চ, ২০২৬",
        icon: "book-open",
    },
    {
        id: "2",
        title: "দান সম্পদে কমতি আনে না, বরং বৃদ্ধি করে",
        content:
            "কুরআন এবং সহিহ হাদিসের আলোকে দানের ফজিলত ও গুরুত্ব সম্পর্কে জানুন। কেন আমাদের নিয়মিত দান করা উচিত। রাসুল (সাঃ) বলেছেন, দান মানুষের সম্পদ কমায় না, বরং এর মধ্যে বরকত দান করে...",
        date: "১০ মার্চ, ২০২৬",
        icon: "heart",
    },
];
