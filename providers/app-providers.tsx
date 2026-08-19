import { AuthKitProvider } from "@/providers/authkit-provider";
import { composeProviders } from "@/providers/compose-providers";
import { ConvexProvider } from "@/providers/convex-provider";
import { ThemeProvider } from "@/providers/theme-provider";

// Add future providers here as they're implemented, e.g.:
// composeProviders(ThemeProvider, AuthKitProvider, ConvexProvider, SonnerProvider, AnalyticsProvider)
export const AppProviders = composeProviders(ThemeProvider, AuthKitProvider, ConvexProvider);
