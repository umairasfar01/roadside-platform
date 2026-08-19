import type { LucideIcon } from "lucide-react";
import {
  BatteryWarning,
  CircleEllipsis,
  Cog,
  Disc,
  Fuel,
  OctagonAlert,
  ThermometerSun,
  Truck,
} from "lucide-react";

/** Roadside issue categories a customer can report against their vehicle. */
export type IssueTypeId =
  | "tire"
  | "battery"
  | "fuel"
  | "engine"
  | "brake"
  | "towing"
  | "overheating"
  | "other";

export interface IssueOption {
  id: IssueTypeId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const ISSUE_OPTIONS: IssueOption[] = [
  {
    id: "tire",
    label: "Tire",
    description: "Flat tire or blowout",
    icon: Disc,
  },
  {
    id: "battery",
    label: "Battery",
    description: "Won't start or jump-start needed",
    icon: BatteryWarning,
  },
  {
    id: "fuel",
    label: "Fuel",
    description: "Out of fuel or wrong fuel type",
    icon: Fuel,
  },
  {
    id: "engine",
    label: "Engine",
    description: "Won't start or running rough",
    icon: Cog,
  },
  {
    id: "brake",
    label: "Brake",
    description: "Soft, grinding, or failed brakes",
    icon: OctagonAlert,
  },
  {
    id: "towing",
    label: "Towing",
    description: "Vehicle needs to be towed",
    icon: Truck,
  },
  {
    id: "overheating",
    label: "Overheating",
    description: "Engine running hot",
    icon: ThermometerSun,
  },
  {
    id: "other",
    label: "Other",
    description: "Something else is wrong",
    icon: CircleEllipsis,
  },
];

export function findIssueOption(id: string | undefined): IssueOption | undefined {
  return ISSUE_OPTIONS.find((option) => option.id === id);
}
