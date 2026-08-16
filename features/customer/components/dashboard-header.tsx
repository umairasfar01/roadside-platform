import { Bell, CircleUserRound } from "lucide-react";
import { Body, H1 } from "@/components/patterns/typography";
import { Button } from "@/components/ui/button";

/** Page-level header: greeting, supporting copy, and notification/account entry points. */
export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1">
        <H1 className="text-h2 sm:text-h1">Good morning</H1>
        <Body className="text-muted-foreground">
          Manage your vehicles, roadside requests, and service history.
        </Body>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Account">
          <CircleUserRound />
        </Button>
      </div>
    </header>
  );
}
