"use client";

import React from "react";
import { MotionConfig } from "motion/react";

/** Respects the OS "reduce motion" setting for every animation on the site. */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
