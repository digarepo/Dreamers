import { prisma } from "~/db.server";
import type { Statement } from "~/lib/validations/statement";
import { Prisma } from "@prisma/client";

/**
 * Fetch all statements for a financial note
 * @param fnId - Financial Note ID
 * @returns Array of statements ordered by creation date
 */
export async function getStatements(fnId: number) {
  return prisma.$queryRaw`
    SELECT * FROM statements 
    WHERE fn_id = ${fnId}
    ORDER BY created_at DESC
  `;
}

/**
 * Fetch a single statement by ID
 * @param id - Statement ID to retrieve
 * @returns The matching statement or undefined
 */
export async function getStatementById(id: number) {
  const result: Statement[] = await prisma.$queryRaw`
    SELECT * FROM statements 
    WHERE id = ${id}
  `;
  return result[0] as Statement;
}

/**
 * Create a new statement record
 * @param statement - Statement data without auto-generated fields
 * @returns The created statement
 */
export async function createStatement(statement: Omit<Statement, "id"|"version"|"created_at"|"updated_at">) {
  const amount = new Prisma.Decimal(statement.amount.toFixed(2));
  
  return prisma.$queryRaw`
    INSERT INTO statements (financial_note_id, description, amount, status, version, created_at, updated_at)
    VALUES (
      ${statement.fn_id},
      ${statement.description},
      ${amount},
      ${statement.status},
      1,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
  `;
}

/**
 * Update an existing statement
 * @param id - ID of statement to update
 * @param statement - Partial statement data to update
 * @returns The updated statement
 */
export async function updateStatement(id: number, statement: Partial<Statement>) {
  const amount = statement.amount ? new Prisma.Decimal(statement.amount.toFixed(2)) : undefined;
  
  return prisma.$queryRaw`
    UPDATE statements
    SET
      description = ${statement.description},
      amount = ${amount},
      status = ${statement.status},
      version = version + 1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `;
}

/**
 * Delete a statement by ID
 * @param id - ID of statement to delete
 * @returns The deleted statement
 */
export async function deleteStatement(id: number) {
  return prisma.$queryRaw`
    DELETE FROM statements
    WHERE id = ${id}
  `;
}
