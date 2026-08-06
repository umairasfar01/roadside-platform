import { z } from "zod";

export const serviceRequestSchema = z.object({
  vehicleId: z.string().min(1),
  issueDescription: z.string().min(1),
  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
});

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
