"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CarFront, CheckCircle2, MapPin, NotebookPen, OctagonAlert } from "lucide-react";
import { Body, H1, H2 } from "@/components/patterns/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { findVehicleOption } from "@/features/customer/data/vehicle-options";
import { findIssueOption } from "@/features/customer/data/issue-options";

const TOTAL_STEPS = 4;

interface RequestConfirmationStepProps {
  /** Raw, unvalidated `vehicle` query param from the URL. */
  vehicleId?: string;
  /** Raw, unvalidated `issue` query param from the URL. */
  issueId?: string;
  /** Raw, URL-encoded `location` query param from the URL. */
  location?: string;
  /** Raw, URL-encoded, optional `details` query param from the URL. */
  details?: string;
}

/** Decodes a URL query value; returns null for missing, blank, or malformed input rather than throwing. */
function safeDecode(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value).trim();
    return decoded.length > 0 ? decoded : null;
  } catch {
    return null;
  }
}

interface SummaryCardProps {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  changeHref: string;
  changeLabel: string;
}

function SummaryCard({ icon: Icon, label, value, changeHref, changeLabel }: SummaryCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <CardDescription>{label}</CardDescription>
            <CardTitle className="truncate">{value}</CardTitle>
          </div>
        </div>
        <CardAction>
          <Link
            href={changeHref}
            aria-label={changeLabel}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Change
          </Link>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

/** Step 4 of the request-assistance flow: review the request before requesting help. */
export function RequestConfirmationStep({
  vehicleId,
  issueId,
  location,
  details,
}: RequestConfirmationStepProps) {
  const [ready, setReady] = useState(false);

  const vehicle = findVehicleOption(vehicleId);

  const header = (
    <header className="flex flex-col gap-2">
      <Body className="text-sm font-medium text-muted-foreground">Step 4 of {TOTAL_STEPS}</Body>
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
                Choose a vehicle before reviewing your request.
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
  const issue = findIssueOption(issueId);

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
                Choose what&apos;s wrong with your vehicle before reviewing your request.
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

  const resolvedIssueId = issue.id;
  const resolvedLocation = safeDecode(location);

  if (!resolvedLocation) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pb-4">
        {header}
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <MapPin className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <H2 className="text-base">Service location required</H2>
              <Body className="max-w-sm text-sm text-muted-foreground">
                Tell us where your vehicle is located before reviewing your request.
              </Body>
            </div>
            <Link
              href={`${ROUTES.customer.request}/issue?vehicle=${encodeURIComponent(resolvedVehicleId)}&issue=${encodeURIComponent(resolvedIssueId)}`}
              className={buttonVariants({ size: "sm", className: "mt-2" })}
            >
              Choose Location
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const resolvedDetails = safeDecode(details);
  const VehicleIcon = vehicle.icon;
  const IssueIcon = issue.icon;

  const vehicleChangeHref = `${ROUTES.customer.request}?vehicle=${encodeURIComponent(resolvedVehicleId)}`;
  const issueChangeHref = `${ROUTES.customer.request}/issue?vehicle=${encodeURIComponent(resolvedVehicleId)}&issue=${encodeURIComponent(resolvedIssueId)}`;
  const locationChangeHref = `${ROUTES.customer.request}/location?vehicle=${encodeURIComponent(resolvedVehicleId)}&issue=${encodeURIComponent(resolvedIssueId)}`;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pb-4">
      {header}

      <div className="flex flex-col gap-2">
        <H2 id="confirmation-heading" className="text-h4">
          Review your request
        </H2>
        <Body className="text-muted-foreground">
          Please confirm the details below before requesting assistance.
        </Body>
      </div>

      <div className="flex flex-col gap-3" aria-labelledby="confirmation-heading">
        <SummaryCard
          icon={VehicleIcon}
          label="Vehicle"
          value={vehicle.label}
          changeHref={vehicleChangeHref}
          changeLabel="Change vehicle"
        />
        <SummaryCard
          icon={IssueIcon}
          label="Problem"
          value={issue.label}
          changeHref={issueChangeHref}
          changeLabel="Change issue"
        />
        <SummaryCard
          icon={MapPin}
          label="Service location"
          value={resolvedLocation}
          changeHref={locationChangeHref}
          changeLabel="Change service location"
        />
        {resolvedDetails ? (
          <Card size="sm">
            <CardHeader>
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <NotebookPen className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <CardDescription>Additional details</CardDescription>
                  <Body className="text-sm text-foreground">&ldquo;{resolvedDetails}&rdquo;</Body>
                </div>
              </div>
              <CardAction>
                <Link
                  href={locationChangeHref}
                  aria-label="Change additional details"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Change
                </Link>
              </CardAction>
            </CardHeader>
          </Card>
        ) : null}
      </div>

      {ready ? (
        <Alert variant="success">
          <CheckCircle2 aria-hidden="true" />
          <AlertTitle className="flex flex-wrap items-center gap-2">
            Request ready
            <Badge variant="success">Ready for submission</Badge>
          </AlertTitle>
          <AlertDescription>
            Your assistance request is ready to be submitted. Backend submission will be connected
            in the next phase.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <Link href={locationChangeHref} className={buttonVariants({ variant: "outline" })}>
            Back
          </Link>
          <Button size="lg" onClick={() => setReady(true)}>
            Request Assistance
          </Button>
        </div>
      )}
    </div>
  );
}
