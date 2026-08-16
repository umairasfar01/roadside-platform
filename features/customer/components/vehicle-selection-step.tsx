"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type KeyboardEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Body, H1, H2 } from "@/components/patterns/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import { Grid } from "@/components/layout/grid";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { VEHICLE_OPTIONS, type VehicleTypeId } from "@/features/customer/data/vehicle-options";

const TOTAL_STEPS = 4;

/** Step 1 of the request-assistance flow: pick which vehicle needs a mechanic. */
export function VehicleSelectionStep() {
  const router = useRouter();
  const [selected, setSelected] = useState<VehicleTypeId | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = VEHICLE_OPTIONS.findIndex((option) => option.id === selected);
  const focusableIndex = selectedIndex === -1 ? 0 : selectedIndex;

  function selectByIndex(index: number, focus: boolean) {
    const option = VEHICLE_OPTIONS[index];
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
        nextIndex = (index + 1) % VEHICLE_OPTIONS.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + VEHICLE_OPTIONS.length) % VEHICLE_OPTIONS.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = VEHICLE_OPTIONS.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectByIndex(nextIndex, true);
  }

  function handleContinue() {
    if (!selected) return;
    router.push(`${ROUTES.customer.request}/issue?vehicle=${selected}`);
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pb-4">
      <header className="flex flex-col gap-2">
        <Body className="text-sm font-medium text-muted-foreground">
          Step 1 of {TOTAL_STEPS}
        </Body>
        <H1 className="text-h2 sm:text-h1">Request Assistance</H1>
      </header>

      <div className="flex flex-col gap-2">
        <H2 id="vehicle-selection-heading" className="text-h4">
          Select your vehicle
        </H2>
        <Body className="text-muted-foreground">Tell us which vehicle needs assistance.</Body>
      </div>

      <div role="radiogroup" aria-labelledby="vehicle-selection-heading">
        <Grid cols={2} gap="md">
          {VEHICLE_OPTIONS.map((option, index) => {
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
        <Link href={ROUTES.customer.dashboard} className={buttonVariants({ variant: "outline" })}>
          Back
        </Link>
        <Button size="lg" disabled={!selected} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
