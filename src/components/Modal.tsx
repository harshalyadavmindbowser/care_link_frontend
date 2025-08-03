import React from "react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showTickImage?: boolean;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  showTickImage = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/50">

      <div className="bg-white rounded-lg w-[600px] h-[300px] p-6 flex flex-col items-center justify-center text-center space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        {showTickImage && (
          <div className="flex justify-center mb-4">
            <img
              src="/confirmTick.png"
              alt="Success"
              className="w-30 h-30 bg-transparent"
            />
          </div>
        )}

        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

        <div className="mb-4">{children}</div>

        {footer && <div className="flex justify-center space-x-2">{footer}</div>}
      </div>
    </div>
  );
};

export default ReusableModal;
