import { query, prisma } from "~/lib/db.server";
import type { Statement } from "~/lib/validations/statement";

/**
 * Fetch all statements for a given financial note ID
 * @param fn_id - Financial Note ID
 * @returns Array of Statement objects
 */
export async function getStatements(fn_id: number): Promise<Statement[]> {
  const results = await prisma.statements.findMany({
    where: { financial_note_id: fn_id },
    orderBy: { created_at: 'desc' }
  });
  return results.map(prismaToStatement);
}

/**
 * Fetch a single statement by its ID
 * @param id - Statement ID
 * @returns The Statement or undefined
 */
export async function getStatementById(id: number): Promise<Statement | undefined> {
  const result = await prisma.statements.findUnique({
    where: { id }
  });
  return result ? prismaToStatement(result) : undefined;
}

/**
 * Create a new statement
 * @param statement - Statement data (excluding auto fields)
 * @returns The created Statement or undefined
 */
export async function createStatement(statement: Omit<Statement, "id"|"created_at"|"updated_at">): Promise<Statement | undefined> {
  const created = await prisma.statements.create({
    data: statementToPrisma(statement)
  });
  return prismaToStatement(created);
}

/**
 * Update an existing statement
 * @param id - Statement ID
 * @param statement - Partial statement fields to update
 * @returns The updated Statement or undefined
 */
export async function updateStatement(id: number, statement: Partial<Statement>): Promise<Statement | undefined> {
  // Remove fields not allowed to update
  const updateData = { ...statement };
  delete updateData.id;
  delete updateData.created_at;
  delete updateData.updated_at;
  if (Object.keys(updateData).length === 0) return getStatementById(id);
  await prisma.statements.update({
    where: { id },
    data: { ...statementToPrisma(updateData), updated_at: new Date() }
  });
  return getStatementById(id);
}

/**
 * Delete a statement by ID
 * @param id - Statement ID
 * @returns true if deleted
 */
export async function deleteStatement(id: number): Promise<boolean> {
  await prisma.statements.delete({
    where: { id }
  });
  return true;
}

// --- Mapping helpers ---

function prismaToStatement(row: any): Statement {
  return {
    id: row.id,
    fn_id: row.financial_note_id,
    dp_id: row.dp_id,
    deposit_date: row.deposit_date instanceof Date ? row.deposit_date.toISOString().slice(0, 10) : row.deposit_date,
    owner_name: row.owner_name,
    depositor_name: row.depositor_name,
    reconciliation: row.reconciliation ?? 'pending',
    ref_number: row.ref_number,
    deposit_amount: typeof row.amount === 'object' && 'toNumber' in row.amount ? row.amount.toNumber() : Number(row.amount),
    bank_name: row.bank_name,
    account_type: row.account_type ?? 'checking',
    comment: row.comment ?? undefined,
    version: row.version,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    updated_at: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
  };
}

function statementToPrisma(data: Partial<Statement>): any {
  return {
    financial_note_id: data.fn_id,
    dp_id: data.dp_id,
    deposit_date: data.deposit_date,
    owner_name: data.owner_name,
    depositor_name: data.depositor_name,
    reconciliation: data.reconciliation,
    ref_number: data.ref_number,
    amount: data.deposit_amount,
    bank_name: data.bank_name,
    account_type: data.account_type,
    comment: data.comment,
    version: data.version,
    // created_at/updated_at handled by Prisma
  };
}
