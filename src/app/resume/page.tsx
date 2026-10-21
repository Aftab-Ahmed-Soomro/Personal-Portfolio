import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Resume | Aftab Ahmed",
  description: "Official Curriculum Vitae and Resume of Aftab Ahmed - Full Stack Developer & Software Engineer.",
};

export default function ResumePage() {
  const { personalInfo } = portfolioData;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#09090b] text-white overflow-hidden">
      {/* Top Header */}
      <nav className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-white/10 bg-black/90 backdrop-blur-md relative z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-teal-500 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <h1 className="text-sm font-bold uppercase tracking-[0.25em] text-white hidden sm:block">
          My Resume
        </h1>

        <a
          href={personalInfo.resumePdfUrl}
          download="Aftab Ahmed - Full Stack Developer.pdf"
          className="flex items-center gap-2 bg-teal-500 text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white transition shadow-lg"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </a>
      </nav>

      {/* PDF Viewer Container */}
      <div className="flex-1 w-full h-[calc(100vh-80px)] overflow-hidden relative bg-zinc-950">
        <iframe
          src={`${personalInfo.resumePdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
          className="w-full h-full border-none"
          title="Aftab Ahmed Resume"
        />
      </div>
    </div>
  );
}
