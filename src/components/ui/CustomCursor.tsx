"use client";

import React, { useEffect, useRef } from "react";
import { useSoundTheme } from "./SoundThemeContext";

const INTERACTIVE_SELECTOR =
  "a, button, .portfolio-card, .card, .skill-pill, input, textarea, select, [role='button']";

/**
 * Exact port of the original HTML cursor:
 * 12px dot -> scale(4) + white + mix-blend-mode: difference on interactive elements.
 * Uses event delegation, so no listeners need re-attaching when the DOM changes.
 * All essential styles are inline so it never depends on external CSS loading.
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { playHoverSound, playClickSound, isLightMode } = useSoundTheme();

  const soundRef = useRef({ playHoverSound, playClickSound });
  useEffect(() => {
    soundRef.current = { playHoverSound, playClickSound };
  }, [playHoverSound, playClickSound]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (window.innerWidth <= 768) return;

    document.body.classList.add("custom-cursor-enabled");

    const restColor = () =>
      document.body.classList.contains("light-mode") ? "#0d9488" : "#14b8a6";

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursor.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target && target.closest(INTERACTIVE_SELECTOR)) {
        soundRef.current.playHoverSound();
        cursor.style.transform = "scale(4)";
        cursor.style.mixBlendMode = "difference";
        cursor.style.background = "white";
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const related = e.relatedTarget as Element | null;
      const fromInteractive = target?.closest(INTERACTIVE_SELECTOR);
      const toInteractive = related?.closest?.(INTERACTIVE_SELECTOR);
      if (fromInteractive && fromInteractive !== toInteractive) {
        cursor.style.transform = "scale(1)";
        cursor.style.mixBlendMode = "normal";
        cursor.style.background = restColor();
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target && target.closest(INTERACTIVE_SELECTOR)) {
        soundRef.current.playClickSound();
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("click", onClick);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, []);

  // Keep resting color in sync with the theme
  useEffect(() => {
    const cursor = cursorRef.current;
    if (cursor && cursor.style.mixBlendMode !== "difference") {
      cursor.style.background = isLightMode ? "#0d9488" : "#14b8a6";
    }
  }, [isLightMode]);

  return (
    <div
      id="cursor"
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#14b8a6",
        pointerEvents: "none",
        zIndex: 2147483647,
        opacity: 0,
        transition: "transform 0.15s ease-out",
      }}
    />
  );
};
