"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "@/components/animations/Reveal";

export const Footer: React.FC = () => {
  const { personalInfo, navLinks } = portfolioData;

  return (
    <footer
      className="w-full border-t text-[var(--text-muted)]"
      style={{ borderColor: "var(--card-border)" }}
    >
      <Reveal className="w-full max-w-7xl mx-auto pt-20 pb-10 px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start flex-wrap gap-12 pb-16">
          {/* Brand & QR */}
          <div className="flex flex-col gap-6 max-w-sm">
            <Link
              href="#home"
              className="text-3xl font-bold uppercase tracking-tighter text-[var(--text-main)]"
            >
              {personalInfo.logoText}
              <span className="text-amber-500">{personalInfo.titleSuffix}</span>
            </Link>

            <p className="text-xs leading-relaxed font-medium max-w-sm opacity-85 text-[var(--text-muted)]">
              Crafting full-stack web experiences with a focus on clean UI, solid APIs, and delightful UX.
            </p>

            <div
              className="w-32 p-3 border rounded-2xl flex flex-col items-center gap-2 shadow-sm"
              style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center relative p-1">
                <Image
                  src={personalInfo.qrCodeImage}
                  alt={personalInfo.name + " QR Code"}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] font-bold tracking-widest uppercase opacity-60 text-[var(--text-muted)]">
                Scan Me
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)]">
              Explore
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-amber-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)]">
              Socials
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold">
              <li>
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={"mailto:" + personalInfo.email}
                  className="hover:text-amber-500 transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)]">
              Status
            </h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold">
              <li className="flex items-center gap-2 opacity-90 text-[var(--text-main)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {personalInfo.availability}
              </li>
              <li className="flex items-center gap-2 opacity-90 text-[var(--text-main)]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Building in Karachi
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t pt-8 flex flex-col sm:flex-row justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]"
          style={{ borderColor: "var(--card-border)" }}
        >
          <p>© 2026 {personalInfo.name} — Full Stack Developer based in Karachi, Pakistan.</p>
          <p>UTC+5 Karachi, PK</p>
        </div>
      </Reveal>
    </footer>
  );
};
