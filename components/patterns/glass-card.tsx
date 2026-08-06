import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Translucent, blurred surface for use over imagery or gradients. */
export function GlassCard({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-background/40 shadow-[var(--elevation-lg)] backdrop-blur-xl dark:border-white/5 dark:bg-white/[0.03]",
        className,
      )}
      {...props}
    />
  );
}
