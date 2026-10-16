"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Reveal, WordReveal } from "../animations/Reveal";

export const ContactSection: React.FC = () => {
  const { personalInfo } = portfolioData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    formData.append(
      "_subject",
      `New Portfolio Message from ${formData.get("name") || "Visitor"}`
    );
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    try {
      const response = await fetch(personalInfo.formSubmitEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const result = await response.json();
      if (response.ok && result.success !== "false") {
        setStatus({
          type: "success",
          text: "✓ Success! Your message has been sent to Aftab.",
        });
        formEl.reset();
      } else {
        throw new Error(result.message || "Failed");
      }
    } catch {
      setStatus({
        type: "error",
        text: "Oops! Something went wrong. Please try again or email directly.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatus(null);
      }, 7000);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto py-32 px-6 md:px-10 border-t w-full"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
        {/* Left Column */}
        <Reveal direction="right">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 uppercase leading-none text-[var(--text-main)]">
            <WordReveal text="Let's" />
            <br />
            <WordReveal text="build something" delay={0.1} />{" "}
            <span className="text-amber-500">
              <WordReveal text="great." delay={0.35} />
            </span>
          </h2>
          <p className="text-lg text-[var(--text-muted)]">Available for projects and full-time roles.</p>

          <div className="flex gap-6 mt-8">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--text-muted)] hover:text-amber-500 text-2xl transition-transform hover:-translate-y-1"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--text-muted)] hover:text-amber-500 text-2xl transition-transform hover:-translate-y-1"
            >
              <FaLinkedinIn className="w-6 h-6" />
            </a>
          </div>
        </Reveal>

        {/* Right Form */}
        <Reveal direction="left" delay={0.2}>
        <form
          onSubmit={handleSubmit}
          className="portfolio-card p-8 rounded-3xl space-y-4 shadow-xl"
          style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full bg-transparent border-b py-4 outline-none focus:border-amber-500 transition text-[var(--text-main)] placeholder-zinc-500 text-sm"
            style={{ borderColor: "var(--card-border)" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full bg-transparent border-b py-4 outline-none focus:border-amber-500 transition text-[var(--text-main)] placeholder-zinc-500 text-sm"
            style={{ borderColor: "var(--card-border)" }}
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={3}
            required
            className="w-full bg-transparent border-b py-4 outline-none focus:border-amber-500 transition text-[var(--text-main)] placeholder-zinc-500 text-sm resize-none"
            style={{ borderColor: "var(--card-border)" }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-500 text-black py-4 w-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-amber-400 transition-all shadow-lg rounded-xl mt-4 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p
              className={`mt-4 text-center font-bold text-sm ${
                status.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status.text}
            </p>
          )}
        </form>
        </Reveal>
      </div>
    </section>
  );
};
