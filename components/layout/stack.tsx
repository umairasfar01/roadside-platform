import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const STACK_GAP = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
} as const;

const STACK_ALIGN = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

interface StackProps extends ComponentPropsWithoutRef<"div"> {
  gap?: keyof typeof STACK_GAP;
  align?: keyof typeof STACK_ALIGN;
}

/** Vertical flex stack with consistent gap — the common case for flow layouts. For horizontal
 * layouts, use Tailwind's native flex utilities directly (`flex items-center gap-2`). */
export function Stack({ gap = "md", align = "stretch", className, ...props }: StackProps) {
  return (
    <div
      className={cn("flex flex-col", STACK_GAP[gap], STACK_ALIGN[align], className)}
      {...props}
    />
  );
}
