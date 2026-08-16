/**
 * Local placeholder data for UI development only — not sourced from any backend.
 * Replace with a Convex query (e.g. `api.vehicles.listForCustomer`) once the vehicle
 * backend exists. Field names mirror `schemas/vehicle.ts` so the swap stays mechanical.
 */
export type VehicleStatus = "active" | "in_service";

export interface VehicleSummary {
  id: string;
  type: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: VehicleStatus;
}

export const MOCK_VEHICLES: VehicleSummary[] = [
  {
    id: "mock-vehicle-1",
    type: "Sedan",
    make: "Honda",
    model: "Civic",
    year: 2021,
    licensePlate: "7GXK901",
    status: "active",
  },
  {
    id: "mock-vehicle-2",
    type: "SUV",
    make: "Toyota",
    model: "RAV4",
    year: 2019,
    licensePlate: "4LMZ223",
    status: "in_service",
  },
];
