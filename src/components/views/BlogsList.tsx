import React from "react";
import { ArrowLeft, BookOpen, Heart, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  date: string;
  icon: "book-open" | "heart";
}

interface BlogsListProps {
  onBack: () => void;
  onBlogClick: (blog: BlogItem) => void;
}

const BlogsList: React.FC<BlogsListProps> = ({ onBack, onBlogClick }) => {
  const blogs: BlogItem[] = [
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

  return (
    <div
      id="page-blogs-list"
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
            আমাদের কার্যক্রম নিয়ে প্রবন্ধ
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => onBlogClick(blog)}
              className="glass-card-dark rounded-[2rem] p-6 sm:p-8 hover:bg-brand-50/5 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-brand-900/50 rounded-xl flex items-center justify-center mb-6 text-gold-400">
                {blog.icon === "book-open" ? (
                  <BookOpen className="w-6 h-6" />
                ) : (
                  <Heart className="w-6 h-6" />
                )}
              </div>
              <h3 className="font-serif font-bold text-2xl text-brand-50 mb-4 group-hover:text-gold-400">
                {blog.title}
              </h3>
              <p className="text-brand-100/60 font-light mb-6 line-clamp-3">
                {blog.content}
              </p>
              <span className="inline-flex items-center gap-2 text-gold-400 font-medium">
                বিস্তারিত পড়ুন <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsList;
