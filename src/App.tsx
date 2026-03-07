import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Zakat from "@/pages/Zakat";
import Videos from "@/pages/Videos";
import Photos from "@/pages/Photos";
import Blogs from "@/pages/Blogs";
import BlogDetail from "@/pages/BlogDetail";
import ScrollToTop from "@/components/ScrollToTop";
import type { BlogItem } from "@/types/blog";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    // If it's a section on home page
    const sections = ["mission", "activities", "contact", "donate", "hero"];

    if (sections.includes(path)) {
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for render before scrolling
        setTimeout(() => scrollToSection(path), 100);
      } else {
        scrollToSection(path);
      }
      return;
    }

    // Standard URL paths
    if (path === "page-zakat-calculator") {
      navigate("/zakat");
    } else if (path === "page-videos-list") {
      navigate("/videos");
    } else if (path === "page-photos-list") {
      navigate("/photos");
    } else if (path === "page-blogs-list") {
      navigate("/blogs");
    } else {
      navigate(path);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBlogClick = (blog: BlogItem) => {
    navigate(`/blog/${blog.id}`, { state: { blog } });
  };

  return (
    <div className="bg-brand-950 text-brand-50 font-sans antialiased overflow-x-hidden min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar onNavigate={handleNavigate} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/zakat" element={<Zakat onBack={() => navigate("/")} />} />
          <Route path="/videos" element={<Videos onBack={() => navigate("/")} />} />
          <Route path="/photos" element={<Photos onBack={() => navigate("/")} />} />
          <Route path="/blogs" element={<Blogs onBack={() => navigate("/")} onBlogClick={handleBlogClick} />} />
          <Route path="/blog/:id" element={<BlogDetail onBack={() => navigate("/blogs")} />} />
        </Routes>
      </main>

      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default App;
