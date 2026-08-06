import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaLinkProps
  extends ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof buttonVariants> {}

/** A navigational call-to-action styled as a button — a real `<a>`, not a `<button>`, since it navigates. */
export function CtaLink({ variant, size, className, ...props }: CtaLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
