import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Still needed for overlay
import './ConfirmDialog.css'; // Your custom styles

export const showConfirm = ({
  title = 'Are you sure?',
  message = 'Do you really want to perform this action?',
  onConfirm,
  onCancel,
}: {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="my-modal-container">
          <div className="my-modal">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                onClick={() => {
                  onCancel?.();
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      );
    },
  });
};
