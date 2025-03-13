// ErrorPopup.jsx
import { useState, useEffect } from "react";

const ErrorPopup = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="error-popup">
            <p>{message}</p>
            <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
    );
};

export default ErrorPopup;
