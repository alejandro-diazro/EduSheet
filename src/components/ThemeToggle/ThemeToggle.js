import React from 'react';
import './ThemeToggle.css';

function ThemeToggle({ theme, toggleTheme }) {
    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        </button>
    );
}

export default ThemeToggle;