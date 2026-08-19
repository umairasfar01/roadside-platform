import type { Metadata } from "next";
import { PageTransition } from "@/components/patterns/page-transition";
import { LocationSelectionStep } from "@/features/customer/components/location-selection-step";

export const metadata: Metadata = {
  title: "Select Location",
};

function firstSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RequestLocationSelectionPage(
  props: PageProps<"/customer/request/location">,
) {
  const searchParams = await props.searchParams;

  return (
    <PageTransition>
      <LocationSelectionStep
        vehicleId={firstSearchParam(searchParams.vehicle)}
        issueId={firstSearchParam(searchParams.issue)}
      />
    </PageTransition>
  );
}
