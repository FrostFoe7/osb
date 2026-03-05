import React, { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import NoticeBanner from "./components/sections/NoticeBanner";
import Mission from "./components/sections/Mission";
import Activities from "./components/sections/Activities";
import ZakatCalculator from "./components/sections/ZakatCalculator";
import MediaCards from "./components/sections/MediaCards";
import Donate from "./components/sections/Donate";
import Contact from "./components/sections/Contact";
import VideosList from "./components/views/VideosList";
import PhotosList from "./components/views/PhotosList";
import BlogsList from "./components/views/BlogsList";
import type { BlogItem } from "./components/views/BlogsList";
import BlogDetail from "./components/views/BlogDetail";

type PageId =
  | "home"
  | "page-videos-list"
  | "page-photos-list"
  | "page-blogs-list"
  | "page-blog-details";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  const navigateTo = (pageId: string) => {
    // If it's a section on home page
    const sections = [
      "mission",
      "activities",
      "zakat",
      "contact",
      "donate",
      "hero",
    ];
    if (sections.includes(pageId)) {
      if (currentPage !== "home") {
        setCurrentPage("home");
        // Wait for render before scrolling
        setTimeout(() => scrollToSection(pageId), 100);
      } else {
        scrollToSection(pageId);
      }
      return;
    }

    // If it's a subpage
    setCurrentPage(pageId as PageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("hero");
    }
  };

  const handleBlogClick = (blog: BlogItem) => {
    setSelectedBlog(blog);
    setCurrentPage("page-blog-details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Track active section on scroll
  useEffect(() => {
    if (currentPage !== "home") return;

    const handleScroll = () => {
      const sections = [
        "hero",
        "mission",
        "activities",
        "zakat",
        "contact",
        "donate",
      ];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  return (
    <div className="bg-brand-950 text-brand-50 font-sans antialiased overflow-x-hidden min-h-screen flex flex-col">
      <Navbar onNavigate={navigateTo} activeSection={activeSection} />

      <main className="flex-grow">
        {currentPage === "home" && (
          <div className="animate-fade-in">
            <Hero
              onDonateClick={() => navigateTo("donate")}
              onActivitiesClick={() => navigateTo("activities")}
            />
            <NoticeBanner />
            <Mission />
            <Activities />
            <ZakatCalculator />
            <MediaCards onNavigate={navigateTo} />
            <Donate />
            <Contact />
          </div>
        )}

        {currentPage === "page-videos-list" && (
          <VideosList onBack={() => navigateTo("home")} />
        )}

        {currentPage === "page-photos-list" && (
          <PhotosList onBack={() => navigateTo("home")} />
        )}

        {currentPage === "page-blogs-list" && (
          <BlogsList
            onBack={() => navigateTo("home")}
            onBlogClick={handleBlogClick}
          />
        )}

        {currentPage === "page-blog-details" && selectedBlog && (
          <BlogDetail
            blog={selectedBlog}
            onBack={() => navigateTo("page-blogs-list")}
          />
        )}
      </main>

      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default App;
