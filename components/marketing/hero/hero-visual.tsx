"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CarFront, MapPin, Wrench } from "lucide-react";
import { GlassCard } from "@/components/patterns/glass-card";
import { Card } from "@/components/ui/card";

/**
 * Premium placeholder for a product/vehicle illustration: a glass panel with
 * a centered vehicle mark and two floating status chips, gently floating.
 */
export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -10, 0] }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.4 }
          : {
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
            }
      }
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <GlassCard className="flex size-full items-center justify-center">
        <span className="relative flex size-28 items-center justify-center rounded-full bg-primary/5">
          <span className="absolute inset-0 rounded-full ring-1 ring-primary/10" />
          <CarFront className="size-14 text-foreground" strokeWidth={1.5} />
        </span>
      </GlassCard>

      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute top-6 -left-4 sm:-left-8"
      >
        <Card className="flex-row items-center gap-2 px-3 py-2 shadow-[var(--elevation-md)]">
          <span className="flex size-7 items-center justify-center rounded-full bg-success/10 text-success">
            <Wrench className="size-3.5" />
          </span>
          <span className="text-xs font-medium text-foreground">Mechanic en route</span>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="absolute -right-4 bottom-8 sm:-right-8"
      >
        <Card className="flex-row items-center gap-2 px-3 py-2 shadow-[var(--elevation-md)]">
          <span className="flex size-7 items-center justify-center rounded-full bg-highlight/10 text-highlight">
            <MapPin className="size-3.5" />
          </span>
          <span className="text-xs font-medium text-foreground">8 min away</span>
        </Card>
      </motion.div>
    </motion.div>
  );
}
