import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarProps {
  onNavigate: (id: string) => void;
  activeSection?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "আমাদের মিশন", id: "mission", label: "আমাদের মিশন" },
    { name: "কার্যক্রম", id: "activities", label: "কার্যক্রম" },
    { name: "জাকাত", id: "/zakat", label: "জাকাত" },
    { name: "যোগাযোগ", id: "contact", label: "যোগাযোগ" },
  ];

  const getActiveId = () => {
    if (location.pathname === "/zakat") return "/zakat";
    if (location.pathname === "/") return activeSection || "hero";
    return "";
  };

  const activeId = getActiveId();

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
          ? "py-2 bg-brand-950/80 backdrop-blur-xl border-b border-gold-500/20 shadow-lg"
          : "py-4 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Area */}
            <div
              onClick={() => onNavigate("hero")}
              className="flex-shrink-0 flex items-center gap-3 md:gap-4 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center border border-gold-500/30 group-hover:border-gold-400 group-hover:scale-105 transition-all duration-500 shadow-lg relative overflow-hidden z-10">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/014/172/062/small/islamic-school-icon-design-vector.jpg"
                    alt="OSB Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -inset-1 bg-gold-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0"></div>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="font-serif font-bold text-xl md:text-2xl text-brand-50 tracking-wide group-hover:text-gold-400 transition-colors duration-300">
                  OSB
                </span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500 group-hover:text-gold-400 transition-colors duration-300">
                  Foundation
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-sm font-bold tracking-wide transition-all duration-300 hover:text-gold-400 relative group ${activeId === link.id ? "text-gold-400" : "text-brand-50"
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full ${activeId === link.id ? "w-full" : ""
                      }`}
                  ></span>
                </button>
              ))}
              <Button
                onClick={() => onNavigate("donate")}
                variant="outline"
                className="bg-brand-900/40 backdrop-blur-md border border-gold-500/30 text-gold-50 px-8 h-12 rounded-2xl font-bold hover:bg-brand-900/80 hover:border-gold-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-gold-400" /> অনুদান দিন
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-brand-50 hover:text-gold-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <FontAwesomeIcon icon={faBars} className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-brand-950 flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          className="absolute top-6 right-6 text-brand-50 hover:text-gold-400 p-3 transition-transform active:scale-90"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} className="w-8 h-8" />
        </button>

        <div className="relative group mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl shadow-gold-500/10 border border-gold-500/30 overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/014/172/062/small/islamic-school-icon-design-vector.jpg"
              alt="OSB Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] font-bold text-gold-500">
            Foundation
          </div>
        </div>

        <nav className="flex flex-col items-center space-y-7 w-full px-10">
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsMobileMenuOpen(false);
              }}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={`text-2xl md:text-3xl font-serif transition-all duration-500 transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } ${activeId === link.id ? "text-gold-400" : "text-brand-50 hover:text-gold-400"}`}
            >
              {link.name}
            </button>
          ))}

          <Button
            onClick={() => {
              onNavigate("donate");
              setIsMobileMenuOpen(false);
            }}
            variant="outline"
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
            className={`bg-brand-900/40 backdrop-blur-md border border-gold-500/30 text-gold-50 px-8 h-14 rounded-2xl font-bold hover:bg-brand-900/80 hover:border-gold-400 transition-all text-lg mt-6 flex items-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.1)] transform ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } duration-500 active:scale-95`}
          >
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-gold-400 fill-current" /> এখনই দান করুন
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
