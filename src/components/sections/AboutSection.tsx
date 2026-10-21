"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Reveal, Stagger, StaggerItem, WordReveal } from "../animations/Reveal";
import { GraduationCap, Briefcase } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { personalInfo, education, experience } = portfolioData;

  return (
    <section
      id="about"
      className="max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-10 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Giant Heading */}
        <div className="md:col-span-5">
          <h2
            className="font-bold uppercase tracking-tighter leading-[0.85] text-[var(--text-main)]"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            <WordReveal text={personalInfo.aboutHeading} />
            <br />
            <span className="text-teal-500">
              <WordReveal text={personalInfo.aboutHeadingHighlight} delay={0.2} />
            </span>
          </h2>
        </div>

        {/* Right Story & Details */}
        <div className="md:col-span-7">
          <Stagger className="space-y-5 text-[var(--text-muted)]" stagger={0.15} delay={0.15}>
            {personalInfo.aboutParagraphs.map((paragraph, index) => (
              <StaggerItem key={index}>
                <p
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                  className={
                    index === 0
                      ? "text-xl md:text-2xl leading-relaxed font-medium text-[var(--text-main)]"
                      : "text-base md:text-lg opacity-85 leading-relaxed font-normal text-[var(--text-muted)]"
                  }
                />
              </StaggerItem>
            ))}
          </Stagger>

          {/* Highlights Cards */}
          <Stagger className="flex flex-col sm:flex-row gap-4 mt-8" stagger={0.18} delay={0.45}>
            {/* Education Card */}
            <StaggerItem className="flex-1 flex" direction="right">
              <div
                className="portfolio-card p-6 rounded-2xl border-l-4 border-l-teal-500 flex-1 flex flex-col justify-between"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-teal-500">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Education
                    </span>
                  </div>
                  <h4 className="font-bold text-base tracking-tight text-[var(--text-main)]">
                    {education.degree}
                  </h4>
                </div>
                <p className="text-[13px] mt-4 font-bold uppercase tracking-tight text-teal-500">
                  {education.status}
                </p>
              </div>
            </StaggerItem>

            {/* Experience Card */}
            <StaggerItem className="flex-1 flex" direction="right">
              <div
                className="portfolio-card p-6 rounded-2xl border-l-4 border-l-teal-500 flex-1 flex flex-col justify-between"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-teal-500">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Experience
                    </span>
                  </div>
                  <h4 className="font-bold text-base tracking-tight text-[var(--text-main)]">
                    {experience.role}
                  </h4>
                </div>
                <p className="text-[13px] mt-4 font-bold uppercase tracking-tight text-teal-500 italic">
                  {experience.type}
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>

      {/* decorative reveal line */}
      <Reveal direction="none" delay={0.6} className="mt-16">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.35,
          }}
        />
      </Reveal>
    </section>
  );
};
