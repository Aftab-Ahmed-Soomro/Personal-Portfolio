"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface SoundThemeContextType {
  isMuted: boolean;
  isLightMode: boolean;
  toggleSound: () => void;
  toggleTheme: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
}

const SoundThemeContext = createContext<SoundThemeContextType | undefined>(undefined);

export const SoundThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);

  useEffect(() => {
    const hAudio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
    hAudio.volume = 0.1;
    const cAudio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
    cAudio.volume = 0.2;
    hoverAudioRef.current = hAudio;
    clickAudioRef.current = cAudio;

    const savedTheme = localStorage.getItem("portfolio-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const isLight = savedTheme === "light-mode" || (!savedTheme && prefersLight);

    if (isLight) {
      document.body.classList.add("light-mode");
      setIsLightMode(true);
    }

    if (localStorage.getItem("portfolio-sound-muted") === "true") {
      mutedRef.current = true;
      setIsMuted(true);
    }
  }, []);

  const play = (audio: HTMLAudioElement | null) => {
    if (mutedRef.current || !audio) return;
    try {
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = audio.volume;
      clone.play().catch(() => {});
    } catch {
      // ignore autoplay restrictions
    }
  };

  const playHoverSound = useCallback(() => play(hoverAudioRef.current), []);
  const playClickSound = useCallback(() => play(clickAudioRef.current), []);

  const toggleSound = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setIsMuted(next);
    localStorage.setItem("portfolio-sound-muted", String(next));
  }, []);

  const toggleTheme = useCallback(() => {
    const isLight = document.body.classList.toggle("light-mode");
    localStorage.setItem("portfolio-theme", isLight ? "light-mode" : "dark-mode");
    setIsLightMode(isLight);
    play(clickAudioRef.current);
  }, []);

  const value = useMemo(
    () => ({ isMuted, isLightMode, toggleSound, toggleTheme, playHoverSound, playClickSound }),
    [isMuted, isLightMode, toggleSound, toggleTheme, playHoverSound, playClickSound]
  );

  return <SoundThemeContext.Provider value={value}>{children}</SoundThemeContext.Provider>;
};

export const useSoundTheme = () => {
  const context = useContext(SoundThemeContext);
  if (!context) {
    throw new Error("useSoundTheme must be used within SoundThemeProvider");
  }
  return context;
};
