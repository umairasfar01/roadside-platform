"use client";

import { Component, type ReactNode } from "react";
import { Wrench } from "lucide-react";
import { useQuery } from "convex/react";
import { H2 } from "@/components/patterns/typography";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { findIssueOption } from "@/features/customer/data/issue-options";
import { findVehicleOption } from "@/features/customer/data/vehicle-options";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatRequestDate(createdAt: number): string {
  return dateFormatter.format(new Date(createdAt));
}

type BadgeVariant = NonNullable<Parameters<typeof badgeVariants>[0]>["variant"];

function statusBadgeVariant(status: Doc<"assistanceRequests">["status"]): BadgeVariant {
  switch (status) {
    case "completed":
      return "success";
    case "cancelled":
      return "destructive";
    case "pending":
      return "secondary";
    default:
      return "warning";
  }
}

function RecentServicesSkeleton() {
  return (
    <ul className="-my-3 divide-y divide-border">
      {[0, 1, 2].map((index) => (
        <li key={index} className="flex items-center justify-between gap-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Skeleton className="size-9 shrink-0 rounded-lg" />
            <div className="flex min-w-0 flex-col gap-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 shrink-0 rounded-4xl" />
        </li>
      ))}
    </ul>
  );
}

class RecentServicesErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Failed to load recent services:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Unable to load your requests right now.
        </p>
      );
    }

    return this.props.children;
  }
}

function RecentServicesList() {
  const requests = useQuery(api.assistanceRequests.listAssistanceRequests);

  if (requests === undefined) {
    return <RecentServicesSkeleton />;
  }

  if (requests.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        You haven&apos;t submitted any assistance requests yet.
      </p>
    );
  }

  return (
    <ul className="-my-3 divide-y divide-border">
      {requests.map((request) => {
        const vehicle = findVehicleOption(request.vehicleType);
        const issue = findIssueOption(request.issueType);
        const Icon = issue?.icon ?? Wrench;

        return (
          <li key={request._id} className="flex items-center justify-between gap-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                  {issue?.label ?? "Unknown issue"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {vehicle?.label ?? "Unknown vehicle"} · {request.location}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-xs text-muted-foreground">
                {formatRequestDate(request.createdAt)}
              </span>
              <Badge variant={statusBadgeVariant(request.status)} className="capitalize">
                {request.status.replace("_", " ")}
              </Badge>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Recent assistance requests, newest-first. Global/unscoped until authentication exists. */
export function RecentServicesSection() {
  return (
    <section aria-labelledby="recent-services-heading" className="flex flex-col gap-3">
      <H2 id="recent-services-heading" className="text-h4">
        Recent services
      </H2>
      <Card>
        <CardContent>
          <RecentServicesErrorBoundary>
            <RecentServicesList />
          </RecentServicesErrorBoundary>
        </CardContent>
      </Card>
    </section>
  );
}
