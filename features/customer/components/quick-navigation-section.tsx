import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  CarFront,
  ClipboardList,
  CreditCard,
  History,
  MessageSquareWarning,
  Star,
} from "lucide-react";
import { H2 } from "@/components/patterns/typography";
import { Grid } from "@/components/layout/grid";
import { FeatureCard } from "@/components/patterns/feature-card";
import { ROUTES } from "@/constants/routes";

interface QuickNavItem {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const QUICK_NAV_ITEMS: QuickNavItem[] = [
  {
    href: ROUTES.customer.requests,
    label: "Requests",
    description: "Track and manage your service requests.",
    icon: ClipboardList,
  },
  {
    href: ROUTES.customer.vehicles,
    label: "Vehicles",
    description: "View and update your saved vehicles.",
    icon: CarFront,
  },
  {
    href: ROUTES.customer.serviceHistory,
    label: "Service History",
    description: "Review your past repairs and services.",
    icon: History,
  },
  {
    href: ROUTES.customer.payments,
    label: "Payments",
    description: "Manage payment methods and invoices.",
    icon: CreditCard,
  },
  {
    href: ROUTES.customer.reviews,
    label: "Reviews",
    description: "Rate mechanics and view your feedback.",
    icon: Star,
  },
  {
    href: ROUTES.customer.complaints,
    label: "Complaints",
    description: "Report an issue or check its status.",
    icon: MessageSquareWarning,
  },
];

/** Direct access to the rest of the customer area. */
export function QuickNavigationSection() {
  return (
    <section aria-labelledby="quick-navigation-heading" className="flex flex-col gap-3">
      <H2 id="quick-navigation-heading" className="text-h4">
        Quick navigation
      </H2>
      <Grid cols={3} gap="md">
        {QUICK_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <FeatureCard
              icon={<item.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />}
              title={item.label}
              description={item.description}
              className="transition-colors hover:bg-muted/50"
            />
          </Link>
        ))}
      </Grid>
    </section>
  );
}
