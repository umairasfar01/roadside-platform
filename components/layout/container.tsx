import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

const CONTAINER_SIZE = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
} as const;

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  /** Content width rule to apply. Defaults to "lg" (72rem) — the standard page width. */
  size?: keyof typeof CONTAINER_SIZE;
}

export function Container({
  as: Tag = "div",
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", CONTAINER_SIZE[size], className)}
      {...props}
    />
  );
}
