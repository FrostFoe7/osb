import React, { useState, useEffect } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "আমাদের মিশন", id: "mission", label: "আমাদের মিশন" },
    { name: "কর্মপদ্ধতি", id: "process", label: "কর্মপদ্ধতি" },
    { name: "কার্যক্রম", id: "activities", label: "কার্যক্রম" },
    { name: "জাকাত", id: "zakat", label: "জাকাত" },
    { name: "যোগাযোগ", id: "contact", label: "যোগাযোগ" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 bg-brand-950/80 backdrop-blur-xl border-b border-gold-500/20 shadow-lg"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Area */}
            <div
              onClick={() => onNavigate("hero")}
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-brand-900 rounded-xl flex items-center justify-center text-gold-400 font-serif font-bold text-2xl border-2 border-gold-500/30 group-hover:border-gold-400 transition-all duration-500 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">O</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl text-brand-50 tracking-wide leading-none group-hover:text-gold-400 transition-colors">
                  OSB
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-gold-400 relative group ${
                    activeSection === link.id
                      ? "text-gold-400"
                      : "text-brand-50/80"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full ${
                      activeSection === link.id ? "w-full" : ""
                    }`}
                  ></span>
                </button>
              ))}
              <Button
                onClick={() => onNavigate("donate")}
                className="bg-gold-500 text-brand-950 px-7 py-2.5 rounded-full font-bold hover:bg-gold-400 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center gap-2 transform hover:-translate-y-0.5 border border-transparent"
              >
                <HeartHandshake className="w-4 h-4" /> অনুদান দিন
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                className="md:hidden text-brand-50 hover:text-gold-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-brand-950 flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-8 right-8 text-brand-50 hover:text-gold-400 p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>

        <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center text-brand-950 font-serif font-bold text-3xl mb-10 shadow-lg shadow-gold-500/20 border-2 border-brand-900">
          O
        </div>

        <nav className="flex flex-col items-center space-y-8 w-full px-10">
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsMenuOpen(false);
              }}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={`text-3xl font-serif transition-all duration-500 transform ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } ${
                activeSection === link.id
                  ? "text-gold-400"
                  : "text-brand-50 hover:text-gold-400"
              }`}
            >
              {link.name}
            </button>
          ))}

          <Button
            onClick={() => {
              onNavigate("donate");
              setIsMenuOpen(false);
            }}
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
            className={`bg-gold-500 text-brand-950 px-10 py-5 rounded-full font-bold hover:bg-gold-400 transition-all text-xl mt-8 flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.4)] h-auto transform ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            } duration-500`}
          >
            <HeartHandshake className="w-6 h-6 fill-current" /> এখনই দান করুন
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
