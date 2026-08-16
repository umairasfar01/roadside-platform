import { Wrench } from "lucide-react";
import { H2 } from "@/components/patterns/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_RECENT_SERVICES } from "@/features/customer/data/mock-services";

/** Recent completed/cancelled service requests. Backed by mock data until Convex is wired up. */
export function RecentServicesSection() {
  return (
    <section aria-labelledby="recent-services-heading" className="flex flex-col gap-3">
      <H2 id="recent-services-heading" className="text-h4">
        Recent services
      </H2>
      <Card>
        <CardContent>
          {MOCK_RECENT_SERVICES.length > 0 ? (
            <ul className="-my-3 divide-y divide-border">
              {MOCK_RECENT_SERVICES.map((service) => (
                <li key={service.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Wrench className="size-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium text-foreground">
                        {service.serviceType}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {service.vehicle} · {service.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-sm font-medium text-foreground">{service.amount}</span>
                    <Badge
                      variant={service.status === "completed" ? "success" : "secondary"}
                      className="capitalize"
                    >
                      {service.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No completed services yet.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
