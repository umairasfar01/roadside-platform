import type { Metadata } from "next";
import { PageTransition } from "@/components/patterns/page-transition";
import { RequestHistoryList } from "@/features/customer/components/request-history-list";

export const metadata: Metadata = {
  title: "Request History",
};

export default function CustomerRequestsPage() {
  return (
    <PageTransition>
      <RequestHistoryList />
    </PageTransition>
  );
}
