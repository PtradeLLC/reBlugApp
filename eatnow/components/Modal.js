import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-3/4 relative overflow-y-auto h-3/4">
                <button onClick={onClose} className="absolute top-2 right-6">
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

