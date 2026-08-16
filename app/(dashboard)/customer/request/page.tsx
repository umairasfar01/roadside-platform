import type { Metadata } from "next";
import { PageTransition } from "@/components/patterns/page-transition";
import { VehicleSelectionStep } from "@/features/customer/components/vehicle-selection-step";

export const metadata: Metadata = {
  title: "Select Vehicle",
};

export default function RequestVehicleSelectionPage() {
  return (
    <PageTransition>
      <VehicleSelectionStep />
    </PageTransition>
  );
}
