import type { Shareholder } from "~/services/shareholders.service";
import { ShareholderRow } from "./ShareholderRow";

const TABLE_HEADERS = [
  "FN ID",
  "Name (English)",
  "Name (Amharic)",
  "City",
  "Subcity",
  "Wereda",
  "House Number",
  "Phone 1",
  "Phone 2",
  "Email",
  "Share Will",
  "Nationality",
  "Receipt Number",
  "Attended 2023",
  "Certificate Number",
  "Taken Certificate",
  "Share Price",
  "Error Share",
  "Error Form",
  "Error Bank Slip",
  "Comment Medina",
  "General Comment",
];

interface ShareholdersTableProps {
  shareholders: Shareholder[];
}

export function ShareholdersTable({ shareholders }: ShareholdersTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow mb-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th
                key={header}
                className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {shareholders.map((shareholder) => (
            <ShareholderRow key={shareholder.id} shareholder={shareholder} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
