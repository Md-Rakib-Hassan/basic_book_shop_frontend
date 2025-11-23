import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import { useVerifyPinMutation } from "../../redux/features/pin/pinApi";

interface HandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  mode?: "handover" | "return"; // extra attribute
}

export default function HandoverModal({
  isOpen,
  onClose,
  requestId,
  mode = "handover", // default
}: HandoverModalProps) {
  const [date, setDate] = useState("");
  const [enteredPin, setEnteredPin] = useState("");

  const [verifyPin] = useVerifyPinMutation();

  const handleConfirm = async () => {
    if (mode === "handover" && !date) {
      toast.error("Please select a return date.");
      return;
    }
    if (!enteredPin.trim()) {
      toast.error("Please enter the PIN.");
      return;
    }

    try {
      toast.loading("Verifying PIN...");
      await verifyPin({
        requestId,
        pin: enteredPin,
        ...(mode === "handover" ? { returnDate: date } : {}),
      }).unwrap();

      toast.success(
        mode === "handover"
          ? "Handover confirmed and date updated."
          : "Book return confirmed."
      );
      onClose();
    } catch (err) {
      toast.error("PIN mismatch. Please check and try again.");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <Dialog.Panel className="relative bg-white rounded-2xl shadow-lg p-6 max-w-md w-full z-50">
        <Dialog.Title className="text-xl font-semibold mb-4">
          {mode === "handover" ? "Confirm Handover" : "Confirm Return"}
        </Dialog.Title>

        <p className="text-sm text-gray-600 mb-4">
          {mode === "handover"
            ? "Discuss the date with the borrower and enter the PIN they provide. Once confirmed, the return date will be updated."
            : "Enter the owner's PIN to confirm you are returning the book."}
        </p>

        {mode === "handover" && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Return Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 mb-4"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter {mode === "handover" ? "Borrower's" : "Owner's"} PIN
        </label>
        <input
          type="text"
          placeholder="PIN"
          value={enteredPin}
          onChange={(e) => setEnteredPin(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
