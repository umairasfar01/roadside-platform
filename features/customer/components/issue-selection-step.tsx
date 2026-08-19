"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CarFront, CheckCircle2 } from "lucide-react";
import { Body, H1, H2 } from "@/components/patterns/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Grid } from "@/components/layout/grid";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { findVehicleOption } from "@/features/customer/data/vehicle-options";
import {
  findIssueOption,
  ISSUE_OPTIONS,
  type IssueTypeId,
} from "@/features/customer/data/issue-options";

const TOTAL_STEPS = 4;

interface IssueSelectionStepProps {
  /** Raw, unvalidated `vehicle` query param from the URL. */
  vehicleId?: string;
  /** Raw, unvalidated `issue` query param — set when returning from a later step. */
  issueId?: string;
}

/** Step 2 of the request-assistance flow: pick what's wrong with the chosen vehicle. */
export function IssueSelectionStep({ vehicleId, issueId }: IssueSelectionStepProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<IssueTypeId | null>(
    () => findIssueOption(issueId)?.id ?? null,
  );
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const vehicle = findVehicleOption(vehicleId);

  const header: ReactNode = (
    <header className="flex flex-col gap-2">
      <Body className="text-sm font-medium text-muted-foreground">
        Step 2 of {TOTAL_STEPS}
      </Body>
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
                Choose a vehicle before selecting an issue so we can match the right mechanic.
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

  const VehicleIcon = vehicle.icon;
  const resolvedVehicleId = vehicle.id;
  const selectedIndex = ISSUE_OPTIONS.findIndex((option) => option.id === selected);
  const focusableIndex = selectedIndex === -1 ? 0 : selectedIndex;

  function selectByIndex(index: number, focus: boolean) {
    const option = ISSUE_OPTIONS[index];
    setSelected(option.id);
    if (focus) {
      optionRefs.current[index]?.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % ISSUE_OPTIONS.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + ISSUE_OPTIONS.length) % ISSUE_OPTIONS.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = ISSUE_OPTIONS.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectByIndex(nextIndex, true);
  }

  function handleContinue() {
    if (!selected) return;
    router.push(
      `${ROUTES.customer.request}/location?vehicle=${encodeURIComponent(resolvedVehicleId)}&issue=${encodeURIComponent(selected)}`,
    );
  }

  const backHref = `${ROUTES.customer.request}?vehicle=${encodeURIComponent(resolvedVehicleId)}`;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pb-4">
      {header}

      <div className="flex flex-col gap-2">
        <H2 id="issue-selection-heading" className="text-h4">
          What&apos;s wrong with your vehicle?
        </H2>
        <Body className="text-muted-foreground">Select the issue you&apos;re experiencing.</Body>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 ring-1 ring-foreground/10">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-foreground/10">
          <VehicleIcon className="size-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="text-xs text-muted-foreground">Selected vehicle</span>
          <span className="truncate text-sm font-medium text-foreground">{vehicle.label}</span>
        </div>
      </div>

      <div role="radiogroup" aria-labelledby="issue-selection-heading">
        <Grid cols={2} gap="md">
          {ISSUE_OPTIONS.map((option, index) => {
            const isSelected = option.id === selected;
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={option.label}
                tabIndex={index === focusableIndex ? 0 : -1}
                onClick={() => selectByIndex(index, false)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  "group relative flex min-h-28 flex-col items-start gap-3 rounded-xl bg-card p-4 text-left ring-1 ring-foreground/10 transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  isSelected
                    ? "bg-primary/5 ring-2 ring-primary"
                    : "hover:bg-muted/50 hover:ring-foreground/20",
                )}
              >
                {isSelected ? (
                  <CheckCircle2
                    className="absolute top-3 right-3 size-5 text-primary"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground",
                    isSelected && "bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-medium text-foreground">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </span>
              </button>
            );
          })}
        </Grid>
      </div>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
        <Link href={backHref} className={buttonVariants({ variant: "outline" })}>
          Back
        </Link>
        <Button size="lg" disabled={!selected} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
