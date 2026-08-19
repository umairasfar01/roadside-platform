import type { Metadata } from "next";
import { PageTransition } from "@/components/patterns/page-transition";
import { RequestConfirmationStep } from "@/features/customer/components/request-confirmation-step";

export const metadata: Metadata = {
  title: "Confirm Request",
};

function firstSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RequestConfirmationPage(
  props: PageProps<"/customer/request/confirm">,
) {
  const searchParams = await props.searchParams;

  return (
    <PageTransition>
      <RequestConfirmationStep
        vehicleId={firstSearchParam(searchParams.vehicle)}
        issueId={firstSearchParam(searchParams.issue)}
        location={firstSearchParam(searchParams.location)}
        details={firstSearchParam(searchParams.details)}
      />
    </PageTransition>
  );
}
