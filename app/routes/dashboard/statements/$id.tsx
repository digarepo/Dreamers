import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { statementSchema } from "~/lib/validations/statement";
import {
  getStatementById,
  updateStatement,
  deleteStatement,
} from "~/lib/models/statement.server";
import type { Statement } from "~/lib/validations/statement";
import type { ApiResponse } from "~/lib/types/api-response";
import { logError } from "~/lib/logger.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id);
  if (!id) {
    return json<ApiResponse<null>>({ success: false, error: "Missing or invalid statement ID" }, { status: 400 });
  }
  try {
    const statement = await getStatementById(id);
    if (!statement) {
      return json<ApiResponse<null>>({ success: false, error: "Statement not found" }, { status: 404 });
    }
    return json<ApiResponse<Statement>>({ success: true, data: statement });
  } catch (error) {
    logError(error, "loader/$id");
    return json<ApiResponse<null>>({ success: false, error: "Failed to fetch statement" }, { status: 500 });
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id = Number(params.id);
  if (!id) {
    return json<ApiResponse<null>>({ success: false, error: "Missing or invalid statement ID" }, { status: 400 });
  }
  const method = request.method.toUpperCase();
  try {
    if (method === "PUT" || method === "PATCH") {
      const rawData = await request.json();
      const validated = statementSchema.partial().parse(rawData);
      const updated = await updateStatement(id, validated);
      if (!updated) {
        return json<ApiResponse<null>>({ success: false, error: "Statement not found" }, { status: 404 });
      }
      return json<ApiResponse<Statement>>({ success: true, data: updated });
    } else if (method === "DELETE") {
      const deleted = await deleteStatement(id);
      if (!deleted) {
        return json<ApiResponse<null>>({ success: false, error: "Statement not found or already deleted" }, { status: 404 });
      }
      return json<ApiResponse<null>>({ success: true });
    } else {
      return json<ApiResponse<null>>({ success: false, error: "Unsupported method" }, { status: 405 });
    }
  } catch (error) {
    logError(error, "action/$id");
    return json<ApiResponse<null>>({ success: false, error: "Failed to process request" }, { status: 400 });
  }
}

export default function StatementRoute() {
  // No UI for now
  return null;
}
