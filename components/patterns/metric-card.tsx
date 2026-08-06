import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  trend?: { direction: "up" | "down"; value: string };
  icon?: ReactNode;
  className?: string;
}

/** Single KPI: label, value, and an optional trend indicator. */
export function MetricCard({ label, value, trend, icon, className }: MetricCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-label font-medium text-muted-foreground">{label}</span>
          {icon ? <span className="text-muted-foreground">{icon}</span> : null}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-h3 font-semibold text-foreground">{value}</span>
          {trend ? (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                trend.direction === "up" ? "text-success" : "text-destructive",
              )}
            >
              {trend.direction === "up" ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {trend.value}
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
