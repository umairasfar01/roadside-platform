/** Standard lucide-react icon sizes (px), for consistent sizing across the app. */
export const ICON_SIZE = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSize = keyof typeof ICON_SIZE;
