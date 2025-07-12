import { z } from "zod";

/**
 * Base schema for Statement entity validation
 * Validates all core statement fields including database-generated properties
 */
export const statementSchema = z.object({
  id: z.number().int().optional(),
  fn_id: z.number().int(),
  dp_id: z.string().length(20),
  deposit_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  owner_name: z.string().min(1).max(100),
  depositor_name: z.string().min(1).max(100),
  reconciliation: z.enum(['pending', 'verified', 'disputed']).default('pending'),
  ref_number: z.string().min(1).max(20),
  deposit_amount: z.number().refine((n) => /^\d+\.\d{2}$/.test(n.toFixed(2)), { message: 'Must be a valid decimal with 2 places' }),
  bank_name: z.string().min(1).max(100),
  account_type: z.enum(['checking', 'savings', 'business']).default('checking'),
  comment: z.string().max(50).optional(),
  version: z.number().int().default(1),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

/**
 * Schema for statement form validation
 * Used for user input validation, excludes auto-generated fields
 */


/**
 * Type representing a Statement entity
 * Generated from statementSchema validation schema
 */
export type Statement = z.infer<typeof statementSchema>;
