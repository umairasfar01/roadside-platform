"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { transitions } from "@/lib/motion";

interface PageTransitionProps {
  children: ReactNode;
}

/** Subtle fade + rise for route/section entry. Respects prefers-reduced-motion. */
export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.base}
    >
      {children}
    </motion.div>
  );
}
