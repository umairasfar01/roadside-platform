import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const GRID_COLS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-12",
} as const;

const GRID_GAP = {
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-8",
} as const;

interface GridProps extends ComponentPropsWithoutRef<"div"> {
  cols?: keyof typeof GRID_COLS;
  gap?: keyof typeof GRID_GAP;
}

export function Grid({ cols = 3, gap = "md", className, ...props }: GridProps) {
  return <div className={cn("grid", GRID_COLS[cols], GRID_GAP[gap], className)} {...props} />;
}
