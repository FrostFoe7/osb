import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import type { BlogItem } from "./BlogsList";

interface BlogDetailProps {
  blog: BlogItem;
  onBack: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog, onBack }) => {
  return (
    <div
      id="page-blog-details"
      className="pt-32 pb-24 min-h-screen animate-fade-in"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 inline-flex items-center gap-2 text-gold-400 hover:text-brand-50 transition-colors border-gold-500/30 px-5 py-2 rounded-full bg-brand-50/5 h-auto"
        >
          <ArrowLeft className="w-4 h-4" /> প্রবন্ধ লিস্টে ফিরে যান
        </Button>

        <div className="glass-card-dark rounded-[2.5rem] p-6 sm:p-8 md:p-12">
          <div className="mb-8 border-b border-brand-50/10 pb-8">
            <span className="text-gold-500 font-bold tracking-wider text-sm mb-4 block">
              {blog.date}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-50 leading-tight">
              {blog.title}
            </h1>
          </div>
          <div className="text-brand-100/80 text-lg leading-relaxed space-y-6 font-light">
            <p>{blog.content}</p>
            {/* Extended content for demo */}
            <p>
              সাদাকাহ মানুষের অন্তরে প্রশান্তি বয়ে আনে। এটি শুধু গ্রহীতার উপকারে
              আসে না, বরং দাতার আত্মিক উন্নতিতে বড় ভূমিকা রাখে। আমাদের এই
              ফাউন্ডেশনের মূল লক্ষ্য হলো এই ছোট ছোট দানগুলোকে একত্রিত করে বড়
              কিছু করা।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
