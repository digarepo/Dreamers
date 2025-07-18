import { useFetcher } from "@remix-run/react";
import type { Shareholder } from "~/services/shareholders.service";
import { Link } from "@remix-run/react";

interface ShareholderRowProps {
  shareholder: Shareholder;
}

export function ShareholderRow({ shareholder }: ShareholderRowProps) {
  const fetcher = useFetcher();
  const isEditing = fetcher.formData?.get("_action") === "edit";
  const isSubmitting = fetcher.state === "submitting";

  const renderField = (name: keyof Shareholder, isNumeric = false) => {
    const value = shareholder[name] || "";

    if (isEditing) {
      return (
        <input
          type={isNumeric ? "number" : "text"}
          name={name}
          defaultValue={value as string | number}
          className="w-full px-2 py-1 border rounded"
        />
      );
    }
    return isNumeric && typeof value === "number"
      ? value.toFixed(2)
      : value || "-";
  };

  const renderBooleanField = (name: keyof Shareholder, value: boolean) => {
    if (isEditing) {
      return (
        <select
          name={name}
          defaultValue={value.toString()}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );
    }
    return value ? "Yes" : "No";
  };

  return (
    <tr className={isSubmitting ? "opacity-50" : "hover:bg-gray-50"}>
      <td className="py-3 px-4 text-sm">{shareholder.fn_id}</td>
      <td className="py-3 px-4 text-sm">{renderField("name_english")}</td>
      <td className="py-3 px-4 text-sm">{renderField("name_amharic")}</td>
      <td className="py-3 px-4 text-sm">{renderField("city")}</td>
      <td className="py-3 px-4 text-sm">{renderField("subcity")}</td>
      <td className="py-3 px-4 text-sm">{renderField("wereda")}</td>
      <td className="py-3 px-4 text-sm">{renderField("house_number")}</td>
      <td className="py-3 px-4 text-sm">{renderField("phone_1")}</td>
      <td className="py-3 px-4 text-sm">{renderField("phone_2")}</td>
      <td className="py-3 px-4 text-sm">{renderField("email")}</td>
      <td className="py-3 px-4 text-sm">{renderField("share_will", true)}</td>
      <td className="py-3 px-4 text-sm">{renderField("nationality")}</td>
      <td className="py-3 px-4 text-sm">{renderField("receipt_number")}</td>
      <td className="py-3 px-4 text-sm">
        {renderBooleanField(
          "attendance_2023_dec_24",
          shareholder.attendance_2023_dec_24
        )}
      </td>
      <td className="py-3 px-4 text-sm">{renderField("certificate_number")}</td>
      <td className="py-3 px-4 text-sm">
        {renderBooleanField("taken_certificate", shareholder.taken_certificate)}
      </td>
      <td className="py-3 px-4 text-sm">{renderField("share_price", true)}</td>
      <td className="py-3 px-4 text-sm">{renderField("error_share")}</td>
      <td className="py-3 px-4 text-sm">{renderField("error_form")}</td>
      <td className="py-3 px-4 text-sm">{renderField("error_bank_slip")}</td>
      <td className="py-3 px-4 text-sm">{renderField("comment_medina")}</td>
      <td className="py-3 px-4 text-sm">{renderField("general_comment")}</td>

      <td className="py-3 px-4 text-sm space-x-2 whitespace-nowrap">
        {isEditing ? (
          <div className="flex space-x-2">
            <fetcher.Form method="post">
              <input type="hidden" name="id" value={shareholder.id} />
              <input type="hidden" name="_action" value="edit" />
              <button
                type="submit"
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </fetcher.Form>
            <Link
              to="/shareholders"
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </Link>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link
              to={`?edit=${shareholder.id}`}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            <fetcher.Form method="post">
              <input type="hidden" name="id" value={shareholder.id} />
              <input type="hidden" name="_action" value="delete" />
              <button
                type="submit"
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={isSubmitting}
                onClick={(e) => {
                  if (!confirm("Permanently delete this shareholder?")) {
                    e.preventDefault();
                  }
                }}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </fetcher.Form>
          </div>
        )}
      </td>
    </tr>
  );
}
