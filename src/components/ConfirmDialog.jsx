import { Modal } from './Modal';
import { Button } from './Button';

export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title || 'Confirm Action'}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">{message || 'Are you sure you want to proceed?'}</p>
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
};
