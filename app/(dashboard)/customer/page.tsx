import type { Metadata } from "next";
import { Stack } from "@/components/layout/stack";
import { PageTransition } from "@/components/patterns/page-transition";
import { ActiveRequestSection } from "@/features/customer/components/active-request-section";
import { AssistanceCard } from "@/features/customer/components/assistance-card";
import { DashboardHeader } from "@/features/customer/components/dashboard-header";
import { QuickNavigationSection } from "@/features/customer/components/quick-navigation-section";
import { RecentServicesSection } from "@/features/customer/components/recent-services-section";
import { VehiclesSection } from "@/features/customer/components/vehicles-section";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function CustomerDashboardPage() {
  return (
    <PageTransition>
      <Stack gap="xl">
        <DashboardHeader />
        <AssistanceCard />
        <ActiveRequestSection />
        <RecentServicesSection />
        <VehiclesSection />
        <QuickNavigationSection />
      </Stack>
    </PageTransition>
  );
}
