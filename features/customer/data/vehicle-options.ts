import type { LucideIcon } from "lucide-react";
import { Bus, Car, CarTaxiFront, Motorbike, Truck, Van } from "lucide-react";

/** Vehicle categories the request-assistance flow can dispatch a mechanic for. */
export type VehicleTypeId = "car" | "van" | "motorcycle" | "three-wheeler" | "bus" | "lorry";

export interface VehicleOption {
  id: VehicleTypeId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "car",
    label: "Car",
    description: "Sedan, hatchback, or coupe",
    icon: Car,
  },
  {
    id: "van",
    label: "Van",
    description: "Passenger or cargo van",
    icon: Van,
  },
  {
    id: "motorcycle",
    label: "Motorcycle",
    description: "Motorbike or scooter",
    icon: Motorbike,
  },
  {
    id: "three-wheeler",
    label: "Three-wheeler",
    description: "Auto rickshaw or tuk-tuk",
    icon: CarTaxiFront,
  },
  {
    id: "bus",
    label: "Bus",
    description: "Mini or full-size bus",
    icon: Bus,
  },
  {
    id: "lorry",
    label: "Lorry",
    description: "Truck or heavy freight vehicle",
    icon: Truck,
  },
];

export function findVehicleOption(id: string | undefined): VehicleOption | undefined {
  return VEHICLE_OPTIONS.find((option) => option.id === id);
}
