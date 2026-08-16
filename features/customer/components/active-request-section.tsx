import Link from "next/link";
import { Radar } from "lucide-react";
import { Body, H2, H3 } from "@/components/patterns/typography";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

/** Empty state — there is no request-tracking backend yet, so this never pretends otherwise. */
export function ActiveRequestSection() {
  return (
    <section aria-labelledby="active-request-heading" className="flex flex-col gap-3">
      <H2 id="active-request-heading" className="text-h4">
        Active request
      </H2>
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Radar className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <H3 className="text-base">No active roadside requests</H3>
            <Body className="max-w-sm text-sm text-muted-foreground">
              When you request assistance, you&apos;ll be able to track your mechanic&apos;s
              arrival here in real time.
            </Body>
          </div>
          <Link
            href={ROUTES.customer.requests}
            className={buttonVariants({ variant: "outline", size: "sm", className: "mt-2" })}
          >
            View request history
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
