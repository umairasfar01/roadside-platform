import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Container as="section" className="flex min-h-screen flex-col gap-6 py-8">
      {children}
    </Container>
  );
}
