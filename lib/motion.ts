import type { Transition, Variants } from "framer-motion";

/** Elegant, restrained easing — matches Tailwind's --ease-out. */
const easeOut: Transition["ease"] = [0, 0, 0.2, 1];

export const transitions = {
  fast: { duration: 0.15, ease: easeOut } satisfies Transition,
  base: { duration: 0.25, ease: easeOut } satisfies Transition,
  slow: { duration: 0.4, ease: easeOut } satisfies Transition,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.base },
};

/** Apply as `whileHover="hover" initial="rest"` on a motion component. */
export const cardHover: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: transitions.fast },
};
