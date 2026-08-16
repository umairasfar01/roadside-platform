/**
 * Local placeholder data for UI development only — not sourced from any backend.
 * Replace with a Convex query (e.g. `api.serviceRequests.listCompleted`) once the
 * service-history backend exists. Keep this shape in sync with that query's result.
 */
export type RecentServiceStatus = "completed" | "cancelled";

export interface RecentService {
  id: string;
  serviceType: string;
  vehicle: string;
  date: string;
  status: RecentServiceStatus;
  amount: string;
}

export const MOCK_RECENT_SERVICES: RecentService[] = [
  {
    id: "mock-service-1",
    serviceType: "Battery jump-start",
    vehicle: "Honda Civic",
    date: "Aug 9",
    status: "completed",
    amount: "$45.00",
  },
  {
    id: "mock-service-2",
    serviceType: "Flat tire change",
    vehicle: "Toyota RAV4",
    date: "Jul 28",
    status: "completed",
    amount: "$60.00",
  },
  {
    id: "mock-service-3",
    serviceType: "Lockout assistance",
    vehicle: "Honda Civic",
    date: "Jul 14",
    status: "cancelled",
    amount: "$0.00",
  },
];
