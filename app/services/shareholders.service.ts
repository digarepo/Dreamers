import { query } from "../lib/db/db.server"; // Adjust the path as needed

export interface Shareholder {
  id: number;
  fn_id: string;
  name_amharic: string;
  name_english: string;
  city: string | null;
  subcity: string | null;
  wereda: string | null;
  house_number: string | null;
  phone_1: string;
  phone_2: string | null;
  email: string | null;
  share_will: number;
  nationality: string | null;
  receipt_number: string | null;
  attendance_2023_dec_24: boolean;
  certificate_number: string | null;
  taken_certificate: boolean;
  share_price: number | null;
  error_share: string | null;
  error_form: string | null;
  error_bank_slip: string | null;
  comment_medina: string | null;
  general_comment: string | null;
  created_at: Date;
  updated_at: Date;
}

export async function getShareholders(
  page: number = 1,
  pageSize: number = 10
): Promise<{ data: Shareholder[]; total: number; totalPages: number }> {
  const offset = (page - 1) * pageSize;
  try {
    const countQuery = "SELECT COUNT(*) AS total FROM shareholders";
    const countResult: any = await query(countQuery);
    const total = countResult[0]?.total || 0;

    const dataQuery = `
            SELECT * 
            FROM shareholders 
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `;
    const shareholders: Shareholder[] = await query(dataQuery, [
      pageSize,
      offset,
    ]);

    return {
      data: shareholders,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Error fetching shareholders:", error);
    throw new Error("Failed to retrieve shareholder data");
  }
}

export async function updateShareholder(
  id: number,
  updateData: Partial<Shareholder>
): Promise<boolean> {
  try {
    const fields = Object.keys(updateData)
      .map((field) => `${field} = ?`)
      .join(", ");
    const values = [...Object.values(updateData), id];

    const queryStr = `UPDATE shareholders SET ${fields} WHERE id = ?`;
    const result: any = await query(queryStr, values);

    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error updating shareholder ${id}:`, error);
    throw new Error("Failed to update shareholder");
  }
}
// services/shareholders.service.ts
// Add these functions to your existing service file

export interface ShareholderStats {
  total: number;
  attended: number;
  certificatesIssued: number;
  totalShares: number;
  averageShares: number;
  recentRegistrations: number;
}

export async function getShareholderStats(): Promise<ShareholderStats> {
  try {
    // Get main stats
    const statsQuery = `
      SELECT 
        COUNT(*) AS total,
        SUM(attendance_2023_dec_24) AS attended,
        SUM(taken_certificate) AS certificatesIssued,
        SUM(share_will) AS totalShares,
        AVG(share_will) AS averageShares
      FROM shareholders
    `;
    const statsResult: any = await query(statsQuery);
    const stats = statsResult[0];

    // Get recent registrations (last 7 days)
    const recentQuery = `
      SELECT COUNT(*) AS recentRegistrations
      FROM shareholders
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `;
    const recentResult: any = await query(recentQuery);

    return {
      total: stats.total || 0,
      attended: stats.attended || 0,
      certificatesIssued: stats.certificatesIssued || 0,
      totalShares: stats.totalShares || 0,
      averageShares: stats.averageShares || 0,
      recentRegistrations: recentResult[0].recentRegistrations || 0,
    };
  } catch (error) {
    console.error("Error fetching shareholder stats:", error);
    throw new Error("Failed to get shareholder statistics");
  }
}

export async function getRecentShareholders(
  limit: number = 5
): Promise<Shareholder[]> {
  try {
    const queryStr = `
      SELECT id, name_english, name_amharic, created_at
      FROM shareholders
      ORDER BY created_at DESC
      LIMIT ?
    `;
    const result: Shareholder[] = await query(queryStr, [limit]);
    return result;
  } catch (error) {
    console.error("Error fetching recent shareholders:", error);
    throw new Error("Failed to retrieve recent shareholders");
  }
}
export async function deleteShareholder(id: number): Promise<boolean> {
  try {
    const queryStr = "DELETE FROM shareholders WHERE id = ?";
    const result: any = await query(queryStr, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`Error deleting shareholder ${id}:`, error);
    throw new Error("Failed to delete shareholder");
  }
}
