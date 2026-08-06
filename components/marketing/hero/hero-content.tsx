"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BodyLarge, Display } from "@/components/patterns/typography";
import { CtaLink } from "@/components/marketing/cta-link";
import { Badge } from "@/components/ui/badge";
import { transitions } from "@/lib/motion";

export function HeroContent() {
  const shouldReduceMotion = useReducedMotion();

  // `initial`/`animate` values stay constant across server and client so hydration never
  // mismatches; reduced motion is honored by collapsing the transition to zero duration
  // instead of skipping straight to the "visible" keyframe.
  const container: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0 } : transitions.base,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex flex-col items-start gap-6"
    >
      <motion.div variants={item}>
        <Badge variant="outline" className="text-muted-foreground">
          24/7 roadside assistance
        </Badge>
      </motion.div>

      <motion.div variants={item}>
        <Display className="max-w-xl">Get back on the road in minutes.</Display>
      </motion.div>

      <motion.div variants={item}>
        <BodyLarge className="max-w-lg text-muted-foreground">
          Roadside Platform connects you with vetted, nearby mechanics for towing, jump-starts,
          flat tires, and lockouts — tracked in real time from request to repair.
        </BodyLarge>
      </motion.div>

      <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-2">
        <CtaLink href="/sign-in" size="lg">
          Request help now
        </CtaLink>
        <CtaLink href="#how-it-works" variant="outline" size="lg">
          See how it works
        </CtaLink>
      </motion.div>
    </motion.div>
  );
}
