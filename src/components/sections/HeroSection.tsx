"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { portfolioData } from "@/data/portfolioData";
import { PktClock } from "../ui/PktClock";
import { WordReveal, EASE_OUT_EXPO } from "../animations/Reveal";
import { MapPin, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
});

export const HeroSection: React.FC = () => {
  const { personalInfo } = portfolioData;

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row justify-start md:justify-center items-center gap-10 md:gap-16 px-6 md:px-10 max-w-7xl mx-auto pt-32 md:pt-28"
    >
      {/* Morphing Profile Image */}
      <motion.div
        className="relative group shrink-0"
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
      >
        {/* Breathing glow */}
        <motion.div
          className="absolute inset-0 bg-teal-500 blur-[80px] rounded-full pointer-events-none"
          animate={{ opacity: [0.18, 0.38, 0.18], scale: [1, 1.12, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Gentle float */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="relative z-10 hero-image-morph shadow-2xl overflow-hidden border-4 border-teal-500"
            style={{ borderColor: "#14b8a6" }}
          >
            <Image
              src={personalInfo.avatarImage}
              alt={`${personalInfo.name} - ${personalInfo.title}`}
              width={320}
              height={320}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <div className="text-center md:text-left flex flex-col items-center md:items-start max-w-2xl">
        {/* Availability Badge */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex items-center gap-2 border rounded-full p-1 pr-3 mb-6 shadow-md backdrop-blur-md"
          style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <div className="flex items-center gap-2 pl-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse-green" />
            <span className="text-xs font-semibold text-[var(--text-main)] tracking-tight">
              {personalInfo.availability}
            </span>
          </div>
          <a
            href="#contact"
            className="bg-teal-500 text-black text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-teal-400 transition shadow-md"
          >
            Hire now
          </a>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-[0.9] uppercase text-[var(--text-main)]">
          <WordReveal text="Software" immediate delay={0.35} />
          <br />
          <span className="text-teal-500">
            <WordReveal text="Engineer." immediate delay={0.55} />
          </span>
        </h1>

        {/* Bio paragraph */}
        <motion.p
          {...fadeUp(0.8)}
          className="text-base md:text-lg max-w-lg font-normal text-[var(--text-muted)] mb-8 leading-relaxed"
        >
          {personalInfo.shortBio}
        </motion.p>

        {/* Footer info bar */}
        <motion.div
          {...fadeUp(1)}
          className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-[var(--text-muted)] text-xs font-medium border-t pt-4 w-full"
          style={{ borderColor: "var(--card-border)" }}
        >
          <span className="flex items-center gap-1.5 hover:text-[var(--text-main)] transition">
            <MapPin className="w-3.5 h-3.5 text-teal-500" />
            {personalInfo.location}
          </span>

          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
            <PktClock /> PKT
          </span>

          <div
            className="flex items-center gap-4 text-sm pl-2 border-l"
            style={{ borderColor: "var(--card-border)" }}
          >
            {[
              { href: personalInfo.githubUrl, label: "GitHub Profile", icon: <FaGithub className="w-4 h-4" />, external: true },
              { href: personalInfo.linkedinUrl, label: "LinkedIn Profile", icon: <FaLinkedinIn className="w-4 h-4" />, external: true },
              { href: "#contact", label: "Send Email", icon: <Mail className="w-4 h-4" />, external: false },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                whileHover={{ y: -3, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="hover:text-teal-500 text-[var(--text-muted)] transition-colors flex items-center gap-1 text-xs"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
