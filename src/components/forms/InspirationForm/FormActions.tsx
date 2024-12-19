import React from 'react';

interface FormActionsProps {
  onClose: () => void;
  onSubmit: (e: React.MouseEvent) => Promise<void>;
  loading: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ onClose, onSubmit, loading }) => {
  return (
    <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 mt-6 flex justify-end space-x-2 border-t border-gray-200 dark:border-gray-700">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:text-white"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Project'}
      </button>
    </div>
  );
};