import Link from "next/link";
import { CarFront, Plus } from "lucide-react";
import { H2 } from "@/components/patterns/typography";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Grid } from "@/components/layout/grid";
import { ROUTES } from "@/constants/routes";
import { MOCK_VEHICLES } from "@/features/customer/data/mock-vehicles";

/** Saved vehicles summary. Backed by mock data until Convex is wired up. */
export function VehiclesSection() {
  return (
    <section aria-labelledby="vehicles-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <H2 id="vehicles-heading" className="text-h4">
          Your vehicles
        </H2>
        <Link
          href={ROUTES.customer.vehicles}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <Plus data-icon="inline-start" />
          Add Vehicle
        </Link>
      </div>

      {MOCK_VEHICLES.length > 0 ? (
        <Grid cols={2} gap="md">
          {MOCK_VEHICLES.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardContent className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <CarFront className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </span>
                    <Badge
                      variant={vehicle.status === "active" ? "success" : "warning"}
                      className="shrink-0"
                    >
                      {vehicle.status === "active" ? "Active" : "In service"}
                    </Badge>
                  </div>
                  <span className="truncate text-xs text-muted-foreground">
                    {vehicle.type} · Plate {vehicle.licensePlate}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      ) : (
        <Card>
          <CardContent className="py-6 text-center text-sm text-muted-foreground">
            No vehicles saved yet.
          </CardContent>
        </Card>
      )}
    </section>
  );
}
