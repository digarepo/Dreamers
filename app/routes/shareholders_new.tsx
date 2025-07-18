// app/routes/shareholders.tsx
import { useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PageLayout } from "~/components/layout/PageLayout";
import { ShareholderForm } from "~/components/shareholdersform/ShareholderForm";
import { handleShareholderCreation } from "~/lib/forms/shareholder.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "create") {
    const result = await handleShareholderCreation(formData);

    if (result.success) {
      return json({
        success: true,
        message: `✅ Shareholder created successfully with ID: ${result.data.id}`,
      });
    }

    return json(
      {
        success: false,
        error: `❌ ${result.error || "Failed to create shareholder"}`,
      },
      { status: 500 }
    );
  }

  return json({ success: false, error: "❌ Invalid action" }, { status: 400 });
}

export default function ShareholdersPage() {
  const actionData = useActionData<typeof action>();

  return (
    <PageLayout>
      <ShareholderForm actionData={actionData} />
    </PageLayout>
  );
}
