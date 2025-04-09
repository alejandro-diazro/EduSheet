import React from 'react';
import './LanguageSelector.css';

function LanguageSelector({ language, setLanguage }) {
    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-selector"
        >
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    );
}

export default LanguageSelector;