import { Bell, CircleUserRound, LogOut } from "lucide-react";
import { signOut, withAuth } from "@workos-inc/authkit-nextjs";
import { Body, H1 } from "@/components/patterns/typography";
import { Button } from "@/components/ui/button";

async function handleSignOut() {
  "use server";
  await signOut();
}

/** Page-level header: greeting, supporting copy, and notification/account/sign-out entry points. */
export async function DashboardHeader() {
  const { user } = await withAuth();
  const identityLabel = user ? (user.firstName ?? user.name ?? user.email) : null;

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1">
        <H1 className="text-h2 sm:text-h1">Good morning</H1>
        <Body className="text-muted-foreground">
          Manage your vehicles, roadside requests, and service history.
        </Body>
        {identityLabel ? (
          <Body className="text-sm text-muted-foreground">Signed in as {identityLabel}</Body>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Account">
          <CircleUserRound />
        </Button>
        <form action={handleSignOut}>
          <Button type="submit" variant="outline" size="sm">
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
