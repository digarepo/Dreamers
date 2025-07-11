import { z } from "zod";

export const statementSchema = z.object({
  id: z.number().int().positive().optional(),
  financial_note_id: z.number().int().positive(),
  description: z.string().min(1).max(255).regex(/^[a-zA-Z0-9\s.,-]+$/),
  amount: z.number().refine(n => {
    const str = n.toFixed(2);
    return /^\d+\.\d{2}$/.test(str);
  }, "Must be a valid decimal with 2 places"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  version: z.number().int().positive().default(1),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
});

export const statementFormSchema = z.object({
  financial_note_id: z.number().int().positive(),
  description: z.string().min(1).max(255).regex(/^[a-zA-Z0-9\s.,-]+$/),
  amount: z.number().refine(n => {
    const str = n.toFixed(2);
    return /^\d+\.\d{2}$/.test(str);
  }, "Must be a valid decimal with 2 places"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  version: z.number().int().positive().default(1)
});

export type Statement = z.infer<typeof statementSchema>;
