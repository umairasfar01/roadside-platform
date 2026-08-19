"use client";

import { ConvexProvider as ConvexReactProvider, ConvexReactClient } from "convex/react";
import type { WithChildren } from "@/types";
import { env } from "@/lib/env";

const convexClient = env.NEXT_PUBLIC_CONVEX_URL
  ? new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)
  : null;

/**
 * Wraps the app in the Convex React client when NEXT_PUBLIC_CONVEX_URL is
 * configured. Renders children as-is otherwise, so local dev keeps working
 * before a Convex deployment is connected.
 */
export function ConvexProvider({ children }: WithChildren) {
  if (!convexClient) {
    return children;
  }

  return <ConvexReactProvider client={convexClient}>{children}</ConvexReactProvider>;
}
