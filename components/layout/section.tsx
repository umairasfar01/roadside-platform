import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  as?: ElementType;
}

/** Vertical rhythm for a page section, responsive across breakpoints. */
export function Section({ as: Tag = "section", className, ...props }: SectionProps) {
  return <Tag className={cn("py-12 sm:py-16 lg:py-24", className)} {...props} />;
}
