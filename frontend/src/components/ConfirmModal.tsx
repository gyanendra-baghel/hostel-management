import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'danger'
}) => {
  if (!isOpen) return null;

  const typeClasses = {
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-blue-600 hover:bg-blue-700 text-white'
  };

  const iconClasses = {
    danger: 'text-red-600 bg-red-100',
    warning: 'text-yellow-600 bg-yellow-100',
    info: 'text-blue-600 bg-blue-100'
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${iconClasses[type]} mr-3`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        <div className="flex justify-end space-x-3 p-4 bg-gray-50 border-t">
          <button 
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition font-medium"
          >
            {cancelText}
          </button>
          <button 
            type="button"
            onClick={onConfirm}
            className={`px-6 py-2 rounded-lg transition font-medium shadow-sm ${typeClasses[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
