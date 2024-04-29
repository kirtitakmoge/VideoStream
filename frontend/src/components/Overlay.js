import React from "react";

const Overlay = ({ show, onClose, heading, message, onDelete, onRename }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{heading}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="mt-4">{message}</p>
        <div className="flex justify-end mt-4">
          {onDelete && (
            <button onClick={onDelete} className="bg-red-500  text-white px-4 py-2 rounded-md mr-2">
              Delete
            </button>
          )}
          {onRename && (
            <button onClick={onRename} className="bg-blue-500  text-white px-4 py-2 rounded-md">
              Rename
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
