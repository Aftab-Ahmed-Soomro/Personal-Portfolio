"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { portfolioData, ProjectItem } from "@/data/portfolioData";
import { supabase } from "@/lib/supabase";
import { Reveal, EASE_OUT_EXPO } from "../animations/Reveal";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const ProjectsSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Default: static projects dikhayenge
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(
    portfolioData.projects
  );

  // Supabase se dynamic projects fetch karna
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching projects from Supabase:", error);
          return;
        }

        if (data && data.length > 0) {
          // Supabase ke projects ko map karein
          const supabaseProjects: ProjectItem[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
            badge: item.badge || undefined,
            liveUrl: item.live_url || undefined,
            githubUrl: item.github_url || undefined,
          }));

          // Naye Supabase projects shuru mein aayenge, aur purane static projects unke baad!
          setProjectsList([...supabaseProjects, ...portfolioData.projects]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProjects();
  }, []);

  const updateScrollButtons = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    updateScrollButtons();
    const current = sliderRef.current;
    if (current) {
      current.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", updateScrollButtons);
      }
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [projectsList]);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const shift = 380;
    sliderRef.current.scrollBy({
      left: direction === "right" ? shift : -shift,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto py-20 px-6 md:px-10 relative w-full"
    >
      {/* Header */}
      <Reveal
        direction="right"
        className="flex items-center justify-between gap-4 mb-12"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-1.5 h-10 bg-amber-500 rounded-sm origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          />
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-[var(--text-main)]">
            Selected Works
          </h2>
        </div>
      </Reveal>

      {/* Slider Container */}
      <div className="relative group/slider">
        {/* Floating Left Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-30 bg-amber-500 hover:bg-amber-400 text-black w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-amber-300 ${
            canScrollLeft
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <ArrowLeft className="w-5 h-5 font-bold" />
        </button>

        {/* Floating Right Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-30 bg-amber-500 hover:bg-amber-400 text-black w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-amber-300 ${
            canScrollRight
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <ArrowRight className="w-5 h-5 font-bold" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-6 relative"
        >
          {projectsList.map((project, index) => (
            <motion.div
              key={project.id}
              className="flex-none w-full max-w-sm snap-start flex"
              initial={{ opacity: 0, y: 70, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                delay: Math.min(index, 3) * 0.12,
                ease: EASE_OUT_EXPO,
              }}
            >
              <div
                className="portfolio-card group w-full p-6 rounded-[2rem] flex flex-col justify-between"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <div>
                  {/* Media Preview */}
                  <div className="aspect-video w-full relative overflow-hidden rounded-2xl bg-zinc-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover object-top grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    {project.liveUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 pointer-events-none">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto bg-amber-500 text-black px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-all hover:bg-white"
                        >
                          Live Website
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold uppercase tracking-tighter text-[var(--text-main)]">
                        {project.title}
                      </h3>
                      {project.badge && (
                        <span className="text-[9px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed font-medium min-h-[50px] line-clamp-3 text-[var(--text-muted)]">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Action Links */}
                <div
                  className="mt-6 flex gap-4 border-t pt-4"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-widest text-amber-500 hover:text-[var(--text-main)] border-b border-amber-500/30 flex items-center gap-1 transition"
                    >
                      <FaGithub className="w-3 h-3" />
                      Github
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-widest text-amber-500 hover:text-[var(--text-main)] border-b border-amber-500/30 flex items-center gap-1 transition"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
