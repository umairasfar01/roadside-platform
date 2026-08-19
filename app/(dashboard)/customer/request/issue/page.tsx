import type { Metadata } from "next";
import { PageTransition } from "@/components/patterns/page-transition";
import { IssueSelectionStep } from "@/features/customer/components/issue-selection-step";

export const metadata: Metadata = {
  title: "Select Issue",
};

function firstSearchParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RequestIssueSelectionPage(
  props: PageProps<"/customer/request/issue">,
) {
  const searchParams = await props.searchParams;

  return (
    <PageTransition>
      <IssueSelectionStep
        vehicleId={firstSearchParam(searchParams.vehicle)}
        issueId={firstSearchParam(searchParams.issue)}
      />
    </PageTransition>
  );
}
