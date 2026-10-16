"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { portfolioData } from "@/data/portfolioData";
import { Reveal, EASE_OUT_EXPO } from "../animations/Reveal";
import { Star, CheckCircle, MessageSquarePlus } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const { reviews, personalInfo } = portfolioData;
  const [formOpen, setFormOpen] = useState(false);
  const [starRating, setStarRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    formData.append("_subject", `New Client Review Submitted on Portfolio!`);
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("star_rating", String(starRating));

    try {
      const res = await fetch(personalInfo.formSubmitEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        formEl.reset();
        setStarRating(5);
        setFormOpen(false);
        setTimeout(() => setSubmittedSuccess(false), 8000);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setErrorMessage("Could not submit review. Please try again or reach out directly!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="max-w-7xl mx-auto py-20 px-6 md:px-10 overflow-hidden relative w-full"
    >
      {/* Header */}
      <Reveal direction="right" className="flex items-center justify-between mb-12 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-10 bg-amber-500 rounded-sm" />
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-[var(--text-main)]">
            Client Reviews
          </h2>
        </div>

        {/* Toggle Form Button */}
        <div>
          {!formOpen ? (
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 border rounded-full text-xs font-semibold text-[var(--text-main)] hover:border-amber-500 transition-all duration-300"
              style={{ borderColor: "var(--card-border)" }}
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-amber-500" />
              Leave a review
            </button>
          ) : (
            <button
              onClick={() => setFormOpen(false)}
              className="px-5 py-2 border text-[var(--text-muted)] rounded-full text-xs font-semibold hover:text-[var(--text-main)] transition-all"
              style={{ borderColor: "var(--card-border)" }}
            >
              Cancel
            </button>
          )}
        </div>
      </Reveal>

      {/* Review Form Drawer */}
      <AnimatePresence initial={false}>
      {formOpen && (
        <motion.div
          key="review-form"
          className="w-full mb-12 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <form
            onSubmit={handleSubmit}
            className="portfolio-card p-8 rounded-[2rem] space-y-6 relative transition-colors duration-300"
            style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="client_name"
                placeholder="Your name"
                required
                className="w-full bg-transparent border rounded-xl px-5 py-3.5 outline-none focus:border-amber-500 text-sm text-[var(--text-main)] placeholder-zinc-500 transition"
                style={{ borderColor: "var(--card-border)" }}
              />
              <input
                type="text"
                name="client_role"
                placeholder="Role / Company (optional)"
                className="w-full bg-transparent border rounded-xl px-5 py-3.5 outline-none focus:border-amber-500 text-sm text-[var(--text-main)] placeholder-zinc-500 transition"
                style={{ borderColor: "var(--card-border)" }}
              />
            </div>

            <textarea
              name="client_feedback"
              placeholder="Your review..."
              rows={4}
              required
              className="w-full bg-transparent border rounded-xl px-5 py-3.5 outline-none focus:border-amber-500 text-sm text-[var(--text-main)] placeholder-zinc-500 transition resize-none"
              style={{ borderColor: "var(--card-border)" }}
            />

            <div
              className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--text-muted)] font-medium">Rating:</span>
                <div className="flex gap-1 cursor-pointer select-none">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setStarRating(score)}
                      className="p-0.5 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          score <= starRating
                            ? "text-amber-500 fill-amber-500"
                            : "text-zinc-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-500 text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md min-w-[140px] text-center"
              >
                {isSubmitting ? "SENDING..." : "Submit review"}
              </button>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-500 font-semibold">{errorMessage}</p>
            )}
          </form>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Success Notification Alert */}
      {submittedSuccess && (
        <motion.div
          className="w-full mb-8"
          initial={{ opacity: 0, y: -14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-5 flex items-center gap-4 text-emerald-500">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-sm font-semibold tracking-wide">
              Thanks! Your review has been submitted and will appear after approval.
            </p>
          </div>
        </motion.div>
      )}

      {/* Infinite Seamless Reviews Ticker */}
      <Reveal direction="up" delay={0.15} duration={1.1}>
      <div className="w-full relative overflow-hidden mask-edges group">
        <div className="flex animate-ticker w-max py-4 group-hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="portfolio-card flex-none w-[360px] p-8 mr-6 rounded-[2rem] flex flex-col justify-between transition-all duration-300 hover:border-amber-500 hover:scale-[1.02] cursor-pointer"
              style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
            >
              <div>
                <div className="flex gap-1 text-amber-500 text-sm mb-4">
                  {Array.from({ length: rev.rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="w-4 h-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">
                  &ldquo;{rev.feedback}&rdquo;
                </p>
              </div>

              <div
                className="mt-6 flex items-center gap-4 border-t pt-4"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <span className="font-bold text-amber-500 text-xs tracking-wider">
                    {rev.initials}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)]">
                    {rev.name}
                  </h4>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    {rev.role}, {rev.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
};
