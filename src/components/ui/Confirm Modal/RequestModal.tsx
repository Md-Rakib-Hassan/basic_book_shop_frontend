import React, { useState } from "react";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (note: string) => void;
  type: "borrow" | "buy";
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, onConfirm, type }) => {
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 animate-fadeIn">
        <h2 className="text-xl font-bold mb-2 text-gray-900">
          {type === "borrow" ? "📖 Request to Borrow" : "🛒 Request to Buy"}
        </h2>
        <p className="text-gray-600 mb-4">
          Add a note for the owner (optional):
        </p>

        <textarea
          className="w-full border rounded-lg p-3 text-sm mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
          placeholder="Write your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(note);
              setNote(""); // clear after confirm
            }}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
