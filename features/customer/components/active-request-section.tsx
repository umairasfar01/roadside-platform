"use client";

import { Component, useState, type ReactNode } from "react";
import Link from "next/link";
import { MapPin, Radar } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { Body, H2, H3 } from "@/components/patterns/typography";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Grid } from "@/components/layout/grid";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { findIssueOption } from "@/features/customer/data/issue-options";
import { findVehicleOption } from "@/features/customer/data/vehicle-options";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatRequestDate(createdAt: number): string {
  return dateFormatter.format(new Date(createdAt));
}

type RequestStatus = Doc<"assistanceRequests">["status"];
type BadgeVariant = NonNullable<Parameters<typeof badgeVariants>[0]>["variant"];

// Only "pending" | "matching" | "assigned" | "in_progress" are ever returned by
// getActiveAssistanceRequest, but the schema's full status union is covered here
// so this stays exhaustive and type-safe without a runtime type guard.
const STATUS_LABEL: Record<RequestStatus, string> = {
  pending: "Pending",
  matching: "Finding a mechanic",
  assigned: "Mechanic assigned",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_DESCRIPTION: Record<RequestStatus, string> = {
  pending: "Your request has been received.",
  matching: "Finding a mechanic.",
  assigned: "Mechanic assigned.",
  in_progress: "In progress.",
  completed: "This request has been completed.",
  cancelled: "This request was cancelled.",
};

function statusBadgeVariant(status: RequestStatus): BadgeVariant {
  return status === "assigned" || status === "in_progress" ? "warning" : "secondary";
}

function EmptyActiveRequest() {
  return (
    <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Radar className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <H3 className="text-base">No active roadside requests</H3>
        <Body className="max-w-sm text-sm text-muted-foreground">
          When you request assistance, you&apos;ll be able to track your mechanic&apos;s arrival
          here in real time.
        </Body>
      </div>
      <Link
        href={ROUTES.customer.requests}
        className={buttonVariants({ variant: "outline", size: "sm", className: "mt-2" })}
      >
        View request history
      </Link>
    </CardContent>
  );
}

function ActiveRequestSkeleton() {
  return (
    <CardContent className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-20 rounded-4xl" />
      </div>
      <Grid cols={2} gap="sm">
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
      </Grid>
      <Skeleton className="h-4 w-40" />
    </CardContent>
  );
}

type CancelState = { status: "idle" } | { status: "submitting" } | { status: "error"; message: string };

function CancelRequestControl({ requestId }: { requestId: Id<"assistanceRequests"> }) {
  const cancelAssistanceRequest = useMutation(api.assistanceRequests.cancelAssistanceRequest);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<CancelState>({ status: "idle" });

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setState({ status: "idle" });
  }

  async function handleConfirmCancel() {
    if (state.status === "submitting") return;
    setState({ status: "submitting" });
    try {
      await cancelAssistanceRequest({ id: requestId });
      setOpen(false);
      setState({ status: "idle" });
    } catch {
      setState({
        status: "error",
        message: "We couldn't cancel your request. Please try again.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>Cancel request</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel this request?</DialogTitle>
          <DialogDescription>
            We&apos;ll stop looking for a mechanic for this request. You can request assistance
            again at any time.
          </DialogDescription>
        </DialogHeader>
        {state.status === "error" ? (
          <Body role="alert" className="text-sm text-destructive">
            {state.message}
          </Body>
        ) : null}
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Keep request</DialogClose>
          <Button
            variant="destructive"
            disabled={state.status === "submitting"}
            onClick={handleConfirmCancel}
          >
            {state.status === "submitting" ? "Cancelling…" : "Cancel request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ActiveRequestCard({ request }: { request: Doc<"assistanceRequests"> }) {
  const vehicle = findVehicleOption(request.vehicleType);
  const issue = findIssueOption(request.issueType);
  const VehicleIcon = vehicle?.icon;
  const IssueIcon = issue?.icon;

  return (
    <CardContent className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <Body className="text-sm text-muted-foreground">{STATUS_DESCRIPTION[request.status]}</Body>
        <Badge variant={statusBadgeVariant(request.status)} className="shrink-0">
          {STATUS_LABEL[request.status]}
        </Badge>
      </div>

      <Grid cols={2} gap="sm">
        <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-muted/50 p-3 ring-1 ring-foreground/10">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-foreground/10">
            {VehicleIcon ? (
              <VehicleIcon className="size-4" strokeWidth={1.75} aria-hidden="true" />
            ) : null}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-xs text-muted-foreground">Vehicle</span>
            <span className="truncate text-sm font-medium text-foreground">
              {vehicle?.label ?? "Unknown vehicle"}
            </span>
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-muted/50 p-3 ring-1 ring-foreground/10">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-foreground/10">
            {IssueIcon ? <IssueIcon className="size-4" strokeWidth={1.75} aria-hidden="true" /> : null}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-xs text-muted-foreground">Issue</span>
            <span className="truncate text-sm font-medium text-foreground">
              {issue?.label ?? "Unknown issue"}
            </span>
          </div>
        </div>
      </Grid>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
        <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          <span className="truncate">{request.location}</span>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          Requested {formatRequestDate(request.createdAt)}
        </span>
      </div>

      <div className="flex justify-end">
        <CancelRequestControl requestId={request._id} />
      </div>
    </CardContent>
  );
}

class ActiveRequestErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Failed to load active request:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <CardContent className="py-10 text-center">
          <Body className="text-sm text-muted-foreground">
            Unable to load your requests right now.
          </Body>
        </CardContent>
      );
    }

    return this.props.children;
  }
}

function ActiveRequestBody() {
  const request = useQuery(api.assistanceRequests.getActiveAssistanceRequest);

  if (request === undefined) {
    return <ActiveRequestSkeleton />;
  }

  if (request === null) {
    return <EmptyActiveRequest />;
  }

  return <ActiveRequestCard request={request} />;
}

/** The customer's newest non-terminal assistance request, backed by Convex. */
export function ActiveRequestSection() {
  return (
    <section aria-labelledby="active-request-heading" className="flex flex-col gap-3">
      <H2 id="active-request-heading" className="text-h4">
        Active request
      </H2>
      <Card>
        <ActiveRequestErrorBoundary>
          <ActiveRequestBody />
        </ActiveRequestErrorBoundary>
      </Card>
    </section>
  );
}
