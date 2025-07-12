import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { statementSchema } from "~/lib/validations/statement";
import { getStatements, createStatement } from "~/lib/models/statement.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { Statement } from "~/lib/validations/statement";
import type { ApiResponse } from "~/lib/types/api-response";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const fnId = Number(url.searchParams.get("fnId"));
  
  if (!fnId) {
    return json<ApiResponse<Statement[]>>({ success: false, error: "Missing financial note ID" }, { status: 400 });
  }

  try {
    const statements = await getStatements(fnId);
    return json<ApiResponse<Statement[]>>({ success: true, data: statements });
  } catch (error) {
    return json({ 
      success: false, 
      error: "Failed to fetch statements",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 }) as unknown as ApiResponse<Statement[]>;
  }
}

import { logError } from "~/lib/logger.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const rawData = Object.fromEntries(formData);
    // Convert numeric fields and ensure types match Zod/DB
    const data = {
      ...rawData,
      fn_id: Number(rawData.fn_id),
      deposit_amount: Number(rawData.deposit_amount),
      version: rawData.version ? Number(rawData.version) : 1,
    };
    const validated = statementSchema.parse(data);
    const result = await createStatement(validated);
    return json<ApiResponse<Statement>>({ success: true, data: result });
  } catch (error) {
    logError(error, "action/index");
    return json({ 
      success: false,
      error: "Validation or server error",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 }) as unknown as ApiResponse<Statement>;
  }
}

export default function StatementsRoute() {
  const { data: _data } = useLoaderData<typeof loader>();
  return (
    <div>
      {/* UI implementation would go here */}
    </div>
  );
}
