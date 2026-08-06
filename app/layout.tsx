import type { Metadata } from "next";
import { fontSans, fontMono } from "@/lib/fonts";
import { defaultMetadata } from "@/lib/metadata";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
