import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  sidebar: ReactNode;
  topbar?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Structural shell shared by every dashboard role (customer/mechanic/staff/admin).
 * Content-agnostic — pass a role-specific sidebar/topbar once those are built.
 */
export function DashboardShell({ sidebar, topbar, children, className }: DashboardShellProps) {
  return (
    <div className={cn("grid min-h-screen grid-cols-[auto_1fr]", className)}>
      <aside className="sticky top-0 h-screen w-64 shrink-0 border-r border-border bg-sidebar text-sidebar-foreground">
        {sidebar}
      </aside>
      <div className="flex flex-col">
        {topbar ? (
          <div className="sticky top-0 z-[var(--z-sticky)] border-b border-border bg-background/80 backdrop-blur-md">
            {topbar}
          </div>
        ) : null}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
