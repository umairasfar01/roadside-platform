import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

interface TextProps extends ComponentPropsWithoutRef<"p"> {
  as?: ElementType;
}

export function Display({ as: Tag = "h1", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(
        "text-balance font-heading text-display font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H1({ as: Tag = "h1", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(
        "text-balance font-heading text-h1 font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H2({ as: Tag = "h2", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(
        "text-balance font-heading text-h2 font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H3({ as: Tag = "h3", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn("font-heading text-h3 font-medium text-foreground", className)}
      {...props}
    />
  );
}

export function H4({ as: Tag = "h4", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn("font-heading text-h4 font-medium text-foreground", className)}
      {...props}
    />
  );
}

export function BodyLarge({ as: Tag = "p", className, ...props }: TextProps) {
  return (
    <Tag className={cn("text-body-lg text-foreground", className)} {...props} />
  );
}

export function Body({ as: Tag = "p", className, ...props }: TextProps) {
  return <Tag className={cn("text-body text-foreground", className)} {...props} />;
}

export function Caption({ as: Tag = "p", className, ...props }: TextProps) {
  return (
    <Tag className={cn("text-caption text-muted-foreground", className)} {...props} />
  );
}

export function Label({ as: Tag = "label", className, ...props }: TextProps) {
  return (
    <Tag className={cn("text-label font-medium text-foreground", className)} {...props} />
  );
}
