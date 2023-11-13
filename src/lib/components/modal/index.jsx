import React from 'react';
import './modal.scss';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) 
    
    return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-icon" onClick={onClose}>&times;</span>
                <h2>Employee Created!</h2>
            </div>
        </div>
    );
};

export default Modal;
