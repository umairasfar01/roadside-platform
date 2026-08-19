"use client";

import { AuthKitProvider as WorkOSAuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import type { WithChildren } from "@/types";

export function AuthKitProvider({ children }: WithChildren) {
  return <WorkOSAuthKitProvider>{children}</WorkOSAuthKitProvider>;
}
