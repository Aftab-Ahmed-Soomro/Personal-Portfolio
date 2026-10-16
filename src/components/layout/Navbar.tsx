"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "@/data/portfolioData";
import { useSoundTheme } from "../ui/SoundThemeContext";
import {
  FileText,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const { isMuted, isLightMode, toggleSound, toggleTheme } = useSoundTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "expertise", "projects", "reviews", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-6 px-6 md:px-10">
        {/* Logo */}
        <Link
          href="#home"
          className="text-2xl font-extrabold tracking-tighter"
          style={{ color: "var(--text-main)" }}
        >
          {portfolioData.personalInfo.logoText}
          <span className="text-amber-500">{portfolioData.personalInfo.titleSuffix}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-[14px] font-medium text-[var(--text-muted)]">
          {portfolioData.navLinks.map((link) => {
            const sectionTarget = link.href.replace("#", "");
            const isActive = activeSection === sectionTarget;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-white duration-200 hover:text-amber-500 relative py-1 ${
                  isActive ? "text-amber-500 font-semibold" : ""
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 rounded-full"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Resume Button */}
          <Link
            href={portfolioData.personalInfo.resumeUrl}
            className="hidden sm:flex items-center gap-2 bg-amber-500 text-black px-5 py-2.5 rounded-full font-bold text-xs hover:bg-amber-400 transition shadow-lg"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </Link>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="w-10 h-10 flex items-center justify-center rounded-full border transition hover:border-amber-500 hover:text-amber-500"
            style={{
              borderColor: "var(--card-border)",
              color: "var(--text-muted)",
              background: "var(--card-bg)",
            }}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-500" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Theme"
            className="w-10 h-10 flex items-center justify-center rounded-full border transition hover:border-amber-500 hover:text-amber-500"
            style={{
              borderColor: "var(--card-border)",
              color: "var(--text-muted)",
              background: "var(--card-bg)",
            }}
          >
            {isLightMode ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border text-amber-500 hover:border-amber-500 transition"
            style={{ borderColor: "var(--card-border)" }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
          className="md:hidden w-full"
        >
        <div
          className="md:hidden w-full flex flex-col p-6 space-y-4 border-t shadow-2xl transition-all duration-300 animate-fadeInDown"
          style={{
            background: "var(--bg-primary)",
            borderColor: "var(--card-border)",
          }}
        >
          <a
            href="#home"
            onClick={closeMobileMenu}
            className="text-[11px] font-bold uppercase tracking-widest block py-2 border-b text-[var(--text-main)] hover:text-amber-500"
            style={{ borderColor: "var(--card-border)" }}
          >
            Home
          </a>
          {portfolioData.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobileMenu}
              className="text-[11px] font-bold uppercase tracking-widest block py-2 border-b text-[var(--text-main)] hover:text-amber-500"
              style={{ borderColor: "var(--card-border)" }}
            >
              {link.label}
            </a>
          ))}
          <Link
            href={portfolioData.personalInfo.resumeUrl}
            onClick={closeMobileMenu}
            className="bg-amber-500 text-black px-5 py-3 text-[10px] font-bold uppercase tracking-widest block text-center mt-4 rounded-xl"
          >
            Resume
          </Link>
        </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  );
};
