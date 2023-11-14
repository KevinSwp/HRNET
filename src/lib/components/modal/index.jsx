import React from 'react';
import './modal.scss';

/**
 * Modal component for displaying a modal dialog.
 * @param {boolean} isOpen - Determines if the modal is open or closed.
 * @param {Function} onClose - Function to call when closing the modal.
 * @param {string} modalText - Text to display in the modal.
 */
const Modal = ({ isOpen, onClose, modalText }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-icon" onClick={onClose}>&times;</span>
                <h2>{modalText || 'Modifiez ce texte'}</h2>
            </div>
        </div>
    );
};

export default Modal;
