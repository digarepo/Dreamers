import { z } from "zod";
import { randomUUID } from "crypto";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const shareholderSchema = z.object({
  fn_id: z.string().uuid(),
  name_amharic: z.string().min(1).max(100),
  name_english: z.string().min(1).max(100),
  city: z.string().max(100).optional().nullable(),
  subcity: z.string().max(50).optional().nullable(),
  wereda: z.string().max(20).optional().nullable(),
  house_number: z.string().max(20).optional().nullable(),
  phone_1: z.string().min(10).max(20),
  phone_2: z.string().max(20).optional().nullable(),
  email: z.string().email().max(150).optional().nullable(),
  share_will: z.number().min(0),
  nationality: z.string().max(50).optional().nullable(),
  receipt_number: z.string().max(50).optional().nullable(),
  attendance_2023_dec_24: z.boolean().default(false),
  certificate_number: z.string().max(50).optional().nullable(),
  taken_certificate: z.boolean().default(false),
  share_price: z.number().min(0).optional().nullable(),
  error_share: z.string().max(100).optional().nullable(),
  error_form: z.string().max(100).optional().nullable(),
  error_bank_slip: z.string().max(100).optional().nullable(),
  comment_medina: z.string().optional().nullable(),
  general_comment: z.string().optional().nullable(),
});

export type Shareholder = z.infer<typeof shareholderSchema>;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "create") {
    const rawData = Object.fromEntries(formData);

    try {
      const data = shareholderSchema.parse({
        ...rawData,
        fn_id: randomUUID(), // Automatically generate UUID
        share_will: Number(rawData.share_will),
        share_price: rawData.share_price ? Number(rawData.share_price) : null,
        attendance_2023_dec_24: rawData.attendance_2023_dec_24 === "on",
        taken_certificate: rawData.taken_certificate === "on",
      });

      const result = await createShareholder(data);
      return json({
        result: {
          success: true,
          data: {
            id: result.insertId,
            fn_id: data.fn_id, // Return the generated UUID
          },
        },
      });
    } catch (error) {
      console.error("Validation error:", error);
      return json(
        {
          error: {
            success: false,
            error: "Invalid form data",
            details: error instanceof z.ZodError ? error.errors : null,
          },
        },
        { status: 400 }
      );
    }
  }

  return json(
    {
      error: {
        success: false,
        error: "Invalid action",
      },
    },
    { status: 400 }
  );
}
