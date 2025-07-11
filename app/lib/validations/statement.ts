import { z } from "zod";

export const statementSchema = z.object({
  id: z.number().int().positive().optional(),
  fn_id: z.number().int().positive(),
  description: z.string().min(1).max(255),
  amount: z.number().multipleOf(0.01).gte(0),
  status: z.string().max(50).refine(val => ["pending", "approved", "rejected"].includes(val)),
  version: z.number().int().min(1).default(1),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
});

export type Statement = z.infer<typeof statementSchema>;
