import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps extends ComponentPropsWithoutRef<typeof Card> {
  title?: string;
  action?: ReactNode;
}

/** Standard dashboard panel: optional title/action header over content. */
export function DashboardCard({
  title,
  action,
  className,
  children,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={cn("h-full", className)} {...props}>
      {title ? (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {action ? <CardAction>{action}</CardAction> : null}
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
