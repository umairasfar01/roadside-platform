import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Registers the custom `--text-*` font-size scale (display/h1-h4/body-lg/body/caption/label/button)
// defined in app/globals.css, so tailwind-merge classifies e.g. "text-display" as a font-size
// utility instead of ambiguously conflicting with a text-color utility like "text-foreground".
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "h4", "body-lg", "body", "caption", "label", "button"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
