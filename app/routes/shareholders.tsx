import {
  json,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { Shareholder } from "~/services/shareholders.service";
import {
  getShareholders,
  updateShareholder,
  deleteShareholder,
} from "~/services/shareholders.service";
import { ShareholdersTable, Pagination } from "~/components/shareholders";

const DEFAULT_PAGE = 1;
const PAGE_SIZE = 10;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || `${DEFAULT_PAGE}`);

  try {
    const { data, totalPages } = await getShareholders(page, PAGE_SIZE);

    const shareholders = data.map((sh) => ({
      ...sh,
      share_will: parseFloat(sh.share_will),
    }));

    return json({
      shareholders,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    throw new Response("Failed to load shareholders", { status: 500 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("_action");
  const id = Number(formData.get("id"));

  try {
    if (actionType === "delete") {
      await deleteShareholder(id);
    } else if (actionType === "edit") {
      const updates = Object.fromEntries(formData.entries());

      delete updates._action;
      delete updates.id;

      for (const [key, value] of Object.entries(updates)) {
        if (["attendance_2023_dec_24", "taken_certificate"].includes(key)) {
          updates[key] = value === "true";
        } else if (["share_will", "share_price"].includes(key)) {
          updates[key] = parseFloat(value as string);
        }
      }

      await updateShareholder(id, updates);
    }

    return redirect("/shareholders");
  } catch (error) {
    return json({ error: "Failed to process action" }, { status: 500 });
  }
};

export default function ShareholdersPage() {
  const { shareholders, currentPage, totalPages } = useLoaderData<{
    shareholders: Shareholder[];
    currentPage: number;
    totalPages: number;
  }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Shareholders Management</h1>
        <Link
          to="/shareholders/new"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Shareholder
        </Link>
      </header>

      <ShareholdersTable shareholders={shareholders} />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
