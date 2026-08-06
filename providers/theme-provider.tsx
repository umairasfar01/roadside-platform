"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { WithChildren } from "@/types";

export function ThemeProvider({ children }: WithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
