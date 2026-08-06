import { composeProviders } from "@/providers/compose-providers";
import { ThemeProvider } from "@/providers/theme-provider";

// Add future providers here as they're implemented, e.g.:
// composeProviders(ThemeProvider, ConvexProvider, WorkOSProvider, SonnerProvider, AnalyticsProvider)
export const AppProviders = composeProviders(ThemeProvider);
