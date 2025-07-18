import { useEffect, useState } from "react";
import {
  getShareholders,
  updateShareholder,
  deleteShareholder,
  Shareholder,
} from "../services/shareholders.service";
import Modal from "./Modal"; // Assuming you have a Modal component

export default function ShareholdersList() {
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingShareholder, setEditingShareholder] =
    useState<Shareholder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const loadData = async () => {
    try {
      setLoading(true);
      const { data, totalPages } = await getShareholders(page, pageSize);
      setShareholders(data);
      setTotalPages(totalPages);
      setError(null);
    } catch (err) {
      setError("Failed to load shareholders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number, updateData: Partial<Shareholder>) => {
    try {
      await updateShareholder(id, updateData);
      loadData(); // Refresh the data after update
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update shareholder");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this shareholder?")) {
      try {
        await deleteShareholder(id);
        loadData(); // Refresh the data after deletion
      } catch (err) {
        console.error(err);
        setError("Failed to delete shareholder");
      }
    }
  };

  const openEditModal = (shareholder: Shareholder) => {
    setEditingShareholder(shareholder);
    setIsModalOpen(true);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  if (loading)
    return <div className="text-center py-4">Loading shareholders...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shareholders Management</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name (English)</th>
              <th className="py-3 px-4 text-left">Name (Amharic)</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Share Will</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shareholders.map((shareholder) => (
              <tr key={shareholder.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{shareholder.id}</td>
                <td className="py-3 px-4">{shareholder.name_english}</td>
                <td className="py-3 px-4">{shareholder.name_amharic}</td>
                <td className="py-3 px-4">{shareholder.phone_1}</td>
                <td className="py-3 px-4">
                  {shareholder.share_will.toFixed(2)}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => openEditModal(shareholder)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(shareholder.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingShareholder && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Edit Shareholder</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updateData = {
                name_english: formData.get("name_english") as string,
                name_amharic: formData.get("name_amharic") as string,
                phone_1: formData.get("phone_1") as string,
                share_will: parseFloat(formData.get("share_will") as string),
              };
              handleUpdate(editingShareholder.id, updateData);
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Name (English)</label>
                <input
                  type="text"
                  name="name_english"
                  defaultValue={editingShareholder.name_english}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Name (Amharic)</label>
                <input
                  type="text"
                  name="name_amharic"
                  defaultValue={editingShareholder.name_amharic}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  name="phone_1"
                  defaultValue={editingShareholder.phone_1}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Share Will</label>
                <input
                  type="number"
                  name="share_will"
                  defaultValue={editingShareholder.share_will}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
