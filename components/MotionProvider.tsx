"use client";

import { MotionConfig } from "motion/react";

// reducedMotion="user": jika OS meminta gerakan dikurangi, animasi transform
// dimatikan dan hanya opacity yang tersisa.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
