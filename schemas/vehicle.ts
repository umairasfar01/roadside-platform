import { z } from "zod";

export const vehicleSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  licensePlate: z.string().min(1),
  vin: z.string().length(17).optional(),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
