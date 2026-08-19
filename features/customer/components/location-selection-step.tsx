"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CarFront, LocateFixed, OctagonAlert } from "lucide-react";
import { Body, H1, H2 } from "@/components/patterns/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Grid } from "@/components/layout/grid";
import { ROUTES } from "@/constants/routes";
import { findVehicleOption } from "@/features/customer/data/vehicle-options";
import { findIssueOption } from "@/features/customer/data/issue-options";

const TOTAL_STEPS = 4;

interface LocationSelectionStepProps {
  /** Raw, unvalidated `vehicle` query param from the URL. */
  vehicleId?: string;
  /** Raw, unvalidated `issue` query param from the URL. */
  issueId?: string;
}

/**
 * UI-only placeholder for "use my current location". Intentionally does not call
 * navigator.geolocation or any location/mapping service — replace this stub once
 * real geolocation is wired up.
 */
function requestCurrentLocationStub(): Promise<never> {
  return Promise.reject(new Error("Current location detection is not yet available."));
}

/** Step 3 of the request-assistance flow: tell us where the vehicle is. */
export function LocationSelectionStep({ vehicleId, issueId }: LocationSelectionStepProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [locationNotice, setLocationNotice] = useState<string | null>(null);

  const vehicle = findVehicleOption(vehicleId);
  const issue = findIssueOption(issueId);

  const header = (
    <header className="flex flex-col gap-2">
      <Body className="text-sm font-medium text-muted-foreground">Step 3 of {TOTAL_STEPS}</Body>
      <H1 className="text-h2 sm:text-h1">Request Assistance</H1>
    </header>
  );

  if (!vehicle) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pb-4">
        {header}
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <CarFront className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <H2 className="text-base">Vehicle selection required</H2>
              <Body className="max-w-sm text-sm text-muted-foreground">
                Choose a vehicle before entering a location so we can match the right mechanic.
              </Body>
            </div>
            <Link
              href={ROUTES.customer.request}
              className={buttonVariants({ size: "sm", className: "mt-2" })}
            >
              Choose Vehicle
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const resolvedVehicleId = vehicle.id;

  if (!issue) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pb-4">
        {header}
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <OctagonAlert className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <H2 className="text-base">Repair issue required</H2>
              <Body className="max-w-sm text-sm text-muted-foreground">
                Choose what&apos;s wrong with your vehicle before entering a location.
              </Body>
            </div>
            <Link
              href={`${ROUTES.customer.request}/issue?vehicle=${encodeURIComponent(resolvedVehicleId)}`}
              className={buttonVariants({ size: "sm", className: "mt-2" })}
            >
              Choose Issue
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const VehicleIcon = vehicle.icon;
  const IssueIcon = issue.icon;
  const resolvedIssueId = issue.id;
  const canContinue = location.trim().length > 0;

  async function handleUseCurrentLocation() {
    try {
      await requestCurrentLocationStub();
    } catch {
      setLocationNotice("Current location detection will be available soon.");
    }
  }

  function handleContinue() {
    const trimmedLocation = location.trim();
    if (!trimmedLocation) return;

    const params = new URLSearchParams({
      vehicle: resolvedVehicleId,
      issue: resolvedIssueId,
      location: trimmedLocation,
    });

    const trimmedDetails = details.trim();
    if (trimmedDetails) {
      params.set("details", trimmedDetails);
    }

    router.push(`${ROUTES.customer.request}/confirm?${params.toString()}`);
  }

  const backHref = `${ROUTES.customer.request}/issue?vehicle=${encodeURIComponent(resolvedVehicleId)}&issue=${encodeURIComponent(resolvedIssueId)}`;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pb-4">
      {header}

      <div className="flex flex-col gap-2">
        <H2 id="location-heading" className="text-h4">
          Where do you need assistance?
        </H2>
        <Body className="text-muted-foreground">
          Tell us where your vehicle is located so we can send help.
        </Body>
      </div>

      <Grid cols={2} gap="sm">
        <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-muted/50 p-3 ring-1 ring-foreground/10">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-foreground/10">
            <VehicleIcon className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-xs text-muted-foreground">Vehicle</span>
            <span className="truncate text-sm font-medium text-foreground">{vehicle.label}</span>
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-muted/50 p-3 ring-1 ring-foreground/10">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-foreground/10">
            <IssueIcon className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-xs text-muted-foreground">Issue</span>
            <span className="truncate text-sm font-medium text-foreground">{issue.label}</span>
          </div>
        </div>
      </Grid>

      <Card aria-labelledby="location-heading">
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="service-location" className="text-label font-medium text-foreground">
              Service location
            </label>
            <Input
              id="service-location"
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter your location"
              className="h-12 text-base"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleUseCurrentLocation}
              className="w-full justify-center gap-2 sm:w-auto"
            >
              <LocateFixed className="size-4" aria-hidden="true" />
              Use my current location
            </Button>
            {locationNotice ? (
              <Body role="status" aria-live="polite" className="text-sm text-muted-foreground">
                {locationNotice}
              </Body>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location-details" className="text-label font-medium text-foreground">
              Additional location details{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Textarea
              id="location-details"
              name="details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="Landmark, building, entrance, or anything that will help the technician find you."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
        <Link href={backHref} className={buttonVariants({ variant: "outline" })}>
          Back
        </Link>
        <Button size="lg" disabled={!canContinue} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
