"use client";

import React from "react";
import { motion } from "motion/react";
import { portfolioData } from "@/data/portfolioData";
import { Reveal, Stagger, StaggerItem } from "../animations/Reveal";
import { Layers, Code, Layout } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const { marqueeSkills, focusAreas } = portfolioData;

  const renderIcon = (iconName: string) => {
    const cls = "w-8 h-8 text-teal-500";
    switch (iconName) {
      case "layers":
        return <Layers className={cls} />;
      case "layout":
        return <Layout className={cls} />;
      case "code":
      default:
        return <Code className={cls} />;
    }
  };

  return (
    <section
      id="expertise"
      className="max-w-7xl mx-auto py-24 px-6 md:px-10 w-full"
    >
      {/* Title */}
      <Reveal direction="right" className="flex items-center gap-3 mb-12">
        <motion.div
          className="w-1.5 h-8 bg-teal-500 rounded-sm origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--text-main)]">
          Core Expertise
        </h2>
      </Reveal>

      {/* Infinite Skills Marquee */}
      <Reveal direction="none" delay={0.15}>
        <div
          className="w-full overflow-hidden border-b pb-6 mb-12 opacity-85 mask-edges"
          style={{ borderColor: "var(--card-border)" }}
        >
          <div className="animate-marquee flex items-center gap-8 text-xs md:text-sm font-bold tracking-wider text-[var(--text-muted)] uppercase">
            {marqueeSkills.concat(marqueeSkills).map((skill, idx) => (
              <React.Fragment key={`${skill}-${idx}`}>
                <span>{skill}</span>
                <span className="text-teal-500">♥</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3 Pillars / Core Focus Cards */}
      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.15} delay={0.2}>
        {focusAreas.map((area) => (
          <StaggerItem key={area.title} className="flex">
            <motion.div
              className="flex-1 flex"
              whileHover="hover"
              initial="rest"
            >
              <div
                className="portfolio-card p-8 rounded-2xl text-center flex flex-col items-center justify-center flex-1 transition-all duration-300 hover:border-teal-500/40"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <motion.div
                  className="mb-4"
                  variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: { rotate: [0, -12, 10, 0], scale: 1.2 },
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {renderIcon(area.iconName)}
                </motion.div>
                <h3 className="font-bold text-base md:text-lg uppercase tracking-wider mb-2 text-[var(--text-main)]">
                  {area.title}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed max-w-[260px]">
                  {area.description}
                </p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};
