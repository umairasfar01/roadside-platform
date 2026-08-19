"use client";

import { useCallback } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuthKit } from "@convex-dev/workos";
import { useAccessToken, useAuth } from "@workos-inc/authkit-nextjs/components";
import type { WithChildren } from "@/types";
import { env } from "@/lib/env";

const convexClient = env.NEXT_PUBLIC_CONVEX_URL
  ? new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)
  : null;

/** Adapts AuthKit's hooks to the `{isLoading, user, getAccessToken}` shape ConvexProviderWithAuthKit expects. */
function useConvexAuthKitAuth() {
  const { user, loading } = useAuth();
  const { getAccessToken } = useAccessToken();

  const getToken = useCallback(async () => {
    try {
      return (await getAccessToken()) ?? null;
    } catch {
      return null;
    }
  }, [getAccessToken]);

  return { isLoading: loading, user, getAccessToken: getToken };
}

/**
 * Wraps the app in a Convex React client authenticated with WorkOS AuthKit
 * when NEXT_PUBLIC_CONVEX_URL is configured. Renders children as-is
 * otherwise, so local dev keeps working before a Convex deployment is
 * connected. Must render inside AuthKitProvider.
 */
export function ConvexProvider({ children }: WithChildren) {
  if (!convexClient) {
    return children;
  }

  return (
    <ConvexProviderWithAuthKit client={convexClient} useAuth={useConvexAuthKitAuth}>
      {children}
    </ConvexProviderWithAuthKit>
  );
}
