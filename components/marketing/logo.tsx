import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** Brand mark placeholder — swap the icon/wordmark once real brand assets exist. */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Roadside Platform home"
      className={cn("flex items-center gap-2", className)}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <MapPin className="size-4" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="font-heading text-base font-semibold tracking-tight text-foreground">
        Roadside
      </span>
    </Link>
  );
}
