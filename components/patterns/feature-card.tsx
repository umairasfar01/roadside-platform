import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps extends ComponentPropsWithoutRef<typeof Card> {
  icon: ReactNode;
  title: string;
  description: string;
}

/** Icon + title + description card, for marketing feature grids. */
export function FeatureCard({ icon, title, description, ...props }: FeatureCardProps) {
  return (
    <Card {...props}>
      <CardContent className="flex flex-col gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
