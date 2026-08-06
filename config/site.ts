import { env } from "@/lib/env";

export const siteConfig = {
  name: "Roadside Platform",
  shortName: "Roadside",
  description:
    "On-demand roadside vehicle repair — request help and track your technician in real time.",
  url: env.NEXT_PUBLIC_APP_URL,
  links: {} as const,
} as const;

export type SiteConfig = typeof siteConfig;
