import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface NavbarProps {
  logo: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/** Content-agnostic top navigation shell — pass logo/navigation/actions slots. */
export function Navbar({ logo, navigation, actions, className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-[var(--z-sticky)] border-b border-border bg-background/80 backdrop-blur-md",
        className,
      )}
    >
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          {logo}
          {navigation}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </Container>
    </header>
  );
}
