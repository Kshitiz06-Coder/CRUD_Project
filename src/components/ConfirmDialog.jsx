import { Modal } from "./Modal";
import { Button } from "./Button";

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}) => (
  <Modal isOpen={isOpen} onClose={onCancel} title={title || "Confirm Action"}>
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 bg-rose-50 rounded-xl">
          <svg
            className="h-6 w-6 text-rose-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {message || "Are you sure you want to proceed?"}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
          Confirm Delete
        </Button>
      </div>
    </div>
  </Modal>
);
