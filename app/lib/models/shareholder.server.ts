// ~/lib/models/shareholder.server.ts
import { execute } from "~/lib/db/db.server";
import type { Shareholder } from "~/lib/validations/shareholder";
import type { ApiResponse } from "~/lib/types";

export async function createShareholder(
  data: Shareholder
): Promise<ApiResponse<{ id: number }>> {
  try {
    const sql = `
      INSERT INTO shareholders (
        fn_id, name_amharic, name_english, city, subcity, wereda, house_number,
        phone_1, phone_2, email, share_will, nationality, receipt_number,
        attendance_2023_dec_24, certificate_number, taken_certificate,
        share_price, error_share, error_form, error_bank_slip,
        comment_medina, general_comment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.fn_id,
      data.name_amharic,
      data.name_english,
      data.city || null,
      data.subcity || null,
      data.wereda || null,
      data.house_number || null,
      data.phone_1,
      data.phone_2 || null,
      data.email || null,
      data.share_will,
      data.nationality || null,
      data.receipt_number || null,
      data.attendance_2023_dec_24 ? 1 : 0,
      data.certificate_number || null,
      data.taken_certificate ? 1 : 0,
      data.share_price || null,
      data.error_share || null,
      data.error_form || null,
      data.error_bank_slip || null,
      data.comment_medina || null,
      data.general_comment || null,
    ];

    const result: any = await execute(sql, values);
    return { success: true, data: { id: result.insertId } };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      error: error.message,
      sqlState: error.code,
    };
  }
}
