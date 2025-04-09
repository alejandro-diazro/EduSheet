// src/components/Menu.js
import React from 'react';
import './Menu.css';

function Menu({ setExercises, language, translations }) {
    const addTitle = () => {
        setExercises((prev) => [
            ...prev,
            {
                type: 'title',
                content: language === 'es' ? 'Nuevo Título' : 'New Title',
                font: 'Arial',
                size: '14px',
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
            },
        ]);
    };

    const addText = () => {
        setExercises((prev) => [
            ...prev,
            {
                type: 'text',
                content: language === 'es' ? 'Nuevo texto editable' : 'New editable text',
                font: 'Arial',
                size: '14px',
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
            },
        ]);
    };

    const addGuideline = () => {
        setExercises((prev) => [
            ...prev,
            {
                type: 'guideline',
                lineSpacing: 10, // Distancia inicial entre las dos líneas en mm (10mm por defecto)
            },
        ]);
    };

    return (
        <aside className="menu">
            <h2>{language === 'es' ? 'Opciones' : 'Options'}</h2>
            <button onClick={addTitle}>
                {language === 'es' ? 'Añadir Título' : 'Add Title'}
            </button>
            <button onClick={addText}>
                {language === 'es' ? 'Añadir Texto' : 'Add Text'}
            </button>
            <button onClick={addGuideline}>
                {language === 'es' ? 'Añadir Pauta' : 'Add Guideline'}
            </button>
        </aside>
    );
}

export default Menu;