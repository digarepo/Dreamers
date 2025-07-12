import { z } from "zod";

/**
 * Base schema for Statement entity validation
 * Validates all core statement fields including database-generated properties
 */
export const statementSchema = z.object({
  fn_id: z.number().int().positive(),
  dp_id: z.string().length(20),
  deposit_date: z.date(),
  owner_name: z.string().min(1).max(100),
  depositor_name: z.string().min(1).max(100),
  reconciliation: z.enum(['pending', 'verified', 'disputed']).default('pending'),
  ref_number: z.string().length(20),
  deposit_amount: z.number().positive(),
  bank_name: z.string().min(1).max(100),
  account_type: z.enum(['checking', 'savings', 'business']).default('checking'),
  comment: z.string().max(255).optional(),
  version: z.number().int().positive().default(1)
});

/**
 * Schema for statement form validation
 * Used for user input validation, excludes auto-generated fields
 */
export const statementFormSchema = z.object({
  financial_note_id: z.number().int().positive(),
  description: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-zA-Z0-9\s.,-]+$/),
  amount: z.number().refine((n) => {
    const str = n.toFixed(2);
    return /^\d+\.\d{2}$/.test(str);
  }, "Must be a valid decimal with 2 places"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  version: z.number().int().positive().default(1),
});

/**
 * Type representing a Statement entity
 * Generated from statementSchema validation schema
 */
export type Statement = z.infer<typeof statementSchema>;
