import { BadgeCheck, Clock, ShieldCheck, type LucideIcon } from "lucide-react";
import { Caption } from "@/components/patterns/typography";

const TRUST_ITEMS: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Licensed & insured" },
  { icon: BadgeCheck, label: "Background-checked mechanics" },
  { icon: Clock, label: "Available 24/7" },
];

export function HeroTrustBar() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
          <Caption as="span" className="text-muted-foreground">
            {label}
          </Caption>
        </li>
      ))}
    </ul>
  );
}
