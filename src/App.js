import React, { useState } from 'react';
import Modal from './lib/components/modal';
import './app.scss';

function App() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className="app-container">
            <button className="save-button" onClick={() => setModalOpen(true)}>Save</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
        
    );
}

export default App;
