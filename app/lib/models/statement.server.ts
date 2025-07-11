import { prisma } from "~/db.server";
import type { Statement } from "~/lib/validations/statement";
import { Prisma } from "@prisma/client";

export async function getStatements(fnId: number) {
  return prisma.$queryRaw`
    SELECT * FROM statements 
    WHERE financial_note_id = ${fnId}
    ORDER BY created_at DESC
  `;
}

export async function getStatementById(id: number) {
  const result: Statement[] = await prisma.$queryRaw`
    SELECT * FROM statements 
    WHERE id = ${id}
  `;
  return result[0] as Statement;
}

export async function createStatement(statement: Omit<Statement, "id"|"version"|"created_at"|"updated_at">) {
  const amount = new Prisma.Decimal(statement.amount.toFixed(2));
  
  return prisma.$queryRaw`
    INSERT INTO statements (financial_note_id, description, amount, status, version, created_at, updated_at)
    VALUES (
      ${statement.financial_note_id},
      ${statement.description},
      ${amount},
      ${statement.status},
      1,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
  `;
}

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

export async function deleteStatement(id: number) {
  return prisma.$queryRaw`
    DELETE FROM statements
    WHERE id = ${id}
  `;
}
