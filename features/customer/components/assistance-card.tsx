import Link from "next/link";
import { LifeBuoy } from "lucide-react";
import { Body, H2 } from "@/components/patterns/typography";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

/** The strongest action on the dashboard — always visible, always one tap away. */
export function AssistanceCard() {
  return (
    <Card className="shadow-[var(--elevation-md)] ring-1 ring-primary/15">
      <CardContent className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LifeBuoy className="size-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <H2 className="text-h4 sm:text-h3">Need roadside help?</H2>
            <Body className="text-muted-foreground">
              Get a vetted mechanic dispatched to your location in minutes.
            </Body>
          </div>
        </div>
        <Link
          href={ROUTES.customer.request}
          className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}
        >
          Request Assistance
        </Link>
      </CardContent>
    </Card>
  );
}
