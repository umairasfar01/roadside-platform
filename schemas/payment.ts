import { z } from "zod";

export const paymentMethodSchema = z.object({
  cardholderName: z.string().min(1),
  last4: z.string().length(4),
  expiryMonth: z.number().int().min(1).max(12),
  expiryYear: z.number().int().min(new Date().getFullYear()),
});

export type PaymentMethodInput = z.infer<typeof paymentMethodSchema>;
