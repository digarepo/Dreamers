// app/lib/actions/shareholder.server.ts
import { shareholderSchema } from "~/lib/validations/shareholder";
import { createShareholder } from "~/lib/models/shareholder.server";
import { randomUUID } from "crypto";

export async function handleShareholderCreation(formData: FormData) {
  const rawData = {
    fn_id: randomUUID(),
    name_english: formData.get("name_english"),
    name_amharic: formData.get("name_amharic"),
    phone_1: formData.get("phone_1"),
    phone_2: formData.get("phone_2"),
    city: formData.get("city"),
    subcity: formData.get("subcity"),
    wereda: formData.get("wereda"),
    house_number: formData.get("house_number"),
    share_will: Number(formData.get("share_will")),
    share_price: formData.get("share_price")
      ? Number(formData.get("share_price"))
      : null,
    attendance_2023_dec_24: formData.get("attendance_2023_dec_24") === "on",
    taken_certificate: formData.get("taken_certificate") === "on",
    email: formData.get("email"),
    nationality: formData.get("nationality"),
    receipt_number: formData.get("receipt_number"),
    certificate_number: formData.get("certificate_number"),
    error_share: formData.get("error_share"),
    error_form: formData.get("error_form"),
    error_bank_slip: formData.get("error_bank_slip"),
    comment_medina: formData.get("comment_medina"),
    general_comment: formData.get("general_comment"),
  };

  const parsed = shareholderSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => e.message).join(", "),
    };
  }

  return await createShareholder(parsed.data);
}
