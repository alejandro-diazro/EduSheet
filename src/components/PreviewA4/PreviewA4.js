// src/components/PreviewA4.js
import React, { useState } from 'react';
import './PreviewA4.css';

function PreviewA4({ exercises, setExercises, language }) {
    const [editingIndex, setEditingIndex] = useState(null);

    const startEditing = (index) => {
        setEditingIndex(index);
    };

    const stopEditing = () => {
        setEditingIndex(null);
    };

    const updateExercise = (index, updates) => {
        const updatedExercises = [...exercises];
        updatedExercises[index] = { ...updatedExercises[index], ...updates };
        setExercises(updatedExercises);
    };

    const deleteBlock = (index) => {
        setExercises(exercises.filter((_, i) => i !== index));
        if (editingIndex === index) setEditingIndex(null);
    };

    const moveBlock = (index, direction) => {
        const updatedExercises = [...exercises];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < exercises.length) {
            [updatedExercises[index], updatedExercises[newIndex]] = [
                updatedExercises[newIndex],
                updatedExercises[index],
            ];
            setExercises(updatedExercises);
        }
    };

    const duplicateBlock = (index) => {
        const updatedExercises = [...exercises];
        const elementToDuplicate = { ...updatedExercises[index] };
        updatedExercises.splice(index + 1, 0, elementToDuplicate);
        setExercises(updatedExercises);
    };

    const fontOptions = [
        'Arial',
        'Times New Roman',
        'Courier New',
        'Georgia',
        'Verdana',
        'Schoolbell',
        'Annie Use Your Telescope',
        'Coming Soon',
        'Patrick Hand',
        'Architects Daughter',
        'ColeCarreira',
        'Escolar',
        'Escolar_4',
        'Massallera',
        'Trace',
    ];

    return (
        <div className="preview-container">
            <div className="a4-sheet">
                {exercises.map((exercise, index) => (
                    <div key={index} className="exercise">
                        {exercise.type === 'title' || exercise.type === 'text' ? (
                            <div
                                style={{
                                    fontFamily: exercise.font,
                                    fontSize: exercise.size || '14px',
                                    fontWeight: exercise.bold ? 'bold' : 'normal',
                                    fontStyle: exercise.italic ? 'italic' : 'normal',
                                    textDecoration: `${exercise.underline ? 'underline' : ''} ${
                                        exercise.strikethrough ? 'line-through' : ''
                                    }`.trim(),
                                }}
                            >
                                {exercise.type === 'title' ? (
                                    <h3>{exercise.content}</h3>
                                ) : (
                                    <p>{exercise.content}</p>
                                )}
                            </div>
                        ) : exercise.type === 'guideline' ? (
                            <div
                                className="guideline"
                                style={{
                                    height: `calc(${(exercise.lineSpacing || 10) * 3}mm + 4px)`,
                                }}
                            >
                                <div className="guideline-line border-line top-line" />
                                <div className="guideline-line border-line left-line" />
                                <div className="guideline-line border-line right-line" />
                                <div
                                    className="guideline-line center-line top-center-line"
                                    style={{
                                        top: `${exercise.lineSpacing || 10}mm`,
                                    }}
                                />
                                <div
                                    className="guideline-line center-line bottom-center-line"
                                    style={{
                                        top: `${(exercise.lineSpacing || 10) * 2}mm`,
                                    }}
                                />
                                <div className="guideline-line border-line bottom-line" />
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
            <aside className="right-menu">
                <h2>{language === 'es' ? 'Elementos Añadidos' : 'Added Elements'}</h2>
                {exercises.length === 0 ? (
                    <p>{language === 'es' ? 'No hay elementos.' : 'No elements added.'}</p>
                ) : (
                    exercises.map((exercise, index) => (
                        <div key={index} className="menu-item-wrapper">
                            <div className="menu-item">
                <span className="item-label">
                  {exercise.type === 'title'
                      ? (language === 'es' ? 'Título: ' : 'Title: ')
                      : exercise.type === 'text'
                          ? (language === 'es' ? 'Texto: ' : 'Text: ')
                          : (language === 'es' ? 'Pauta: ' : 'Guideline: ')}
                    {exercise.type === 'guideline'
                        ? language === 'es'
                            ? `Distancia ${exercise.lineSpacing}mm`
                            : `Spacing ${exercise.lineSpacing}mm`
                        : exercise.content.length > 20
                            ? exercise.content.substring(0, 20) + '...'
                            : exercise.content}
                </span>
                                <div className="controls">
                  <span
                      className="icon pencil"
                      onClick={() => startEditing(index)}
                      title={language === 'es' ? 'Editar' : 'Edit'}
                  >
                    ✏️
                  </span>
                                    <span
                                        className="icon duplicate"
                                        onClick={() => duplicateBlock(index)}
                                        title={language === 'es' ? 'Duplicar' : 'Duplicate'}
                                    >
                    📋
                  </span>
                                    <span
                                        className="icon trash"
                                        onClick={() => deleteBlock(index)}
                                        title={language === 'es' ? 'Eliminar' : 'Delete'}
                                    >
                    🗑️
                  </span>
                                    <span
                                        className="icon arrow-up"
                                        onClick={() => moveBlock(index, 'up')}
                                        title={language === 'es' ? 'Mover arriba' : 'Move up'}
                                        style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                                    >
                    ⬆️
                  </span>
                                    <span
                                        className="icon arrow-down"
                                        onClick={() => moveBlock(index, 'down')}
                                        title={language === 'es' ? 'Mover abajo' : 'Move down'}
                                        style={{
                                            visibility: index === exercises.length - 1 ? 'hidden' : 'visible',
                                        }}
                                    >
                    ⬇️
                  </span>
                                </div>
                            </div>
                            {editingIndex === index && (
                                <div className="edit-box">
                                    {exercise.type === 'title' || exercise.type === 'text' ? (
                                        <>
                      <textarea
                          value={exercise.content}
                          onChange={(e) => updateExercise(index, { content: e.target.value })}
                          className="edit-textarea"
                      />
                                            <div className="edit-options">
                                                <div className="format-buttons">
                                                    <button
                                                        onClick={() => updateExercise(index, { bold: !exercise.bold })}
                                                        className={exercise.bold ? 'active' : ''}
                                                        title={language === 'es' ? 'Negrita' : 'Bold'}
                                                    >
                                                        B
                                                    </button>
                                                    <button
                                                        onClick={() => updateExercise(index, { italic: !exercise.italic })}
                                                        className={exercise.italic ? 'active' : ''}
                                                        title={language === 'es' ? 'Cursiva' : 'Italic'}
                                                    >
                                                        I
                                                    </button>
                                                    <button
                                                        onClick={() => updateExercise(index, { underline: !exercise.underline })}
                                                        className={exercise.underline ? 'active' : ''}
                                                        title={language === 'es' ? 'Subrayado' : 'Underline'}
                                                    >
                                                        U
                                                    </button>
                                                    <button
                                                        onClick={() => updateExercise(index, { strikethrough: !exercise.strikethrough })}
                                                        className={exercise.strikethrough ? 'active' : ''}
                                                        title={language === 'es' ? 'Tachado' : 'Strikethrough'}
                                                    >
                                                        S
                                                    </button>
                                                </div>
                                                <div className="font-options">
                                                    <label>
                                                        {language === 'es' ? 'Tipografía:' : 'Font:'}
                                                        <select
                                                            value={exercise.font || 'Arial'}
                                                            onChange={(e) => updateExercise(index, { font: e.target.value })}
                                                            className="font-selector"
                                                        >
                                                            {fontOptions.map((font) => (
                                                                <option key={font} value={font}>
                                                                    {font}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                    <label>
                                                        {language === 'es' ? 'Tamaño (px):' : 'Size (px):'}
                                                        <input
                                                            type="number"
                                                            value={parseInt(exercise.size || '14')}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (value >= 1) {
                                                                    updateExercise(index, { size: `${value}px` });
                                                                }
                                                            }}
                                                            className="size-input"
                                                            min="1"
                                                            step="1"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    ) : exercise.type === 'guideline' ? (
                                        <div className="guideline-options">
                                            <label>
                                                {language === 'es' ? 'Distancia entre líneas (mm):' : 'Line spacing (mm):'}
                                                <input
                                                    type="number"
                                                    value={exercise.lineSpacing || 10}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value >= 1) {
                                                            updateExercise(index, { lineSpacing: parseInt(value) });
                                                        }
                                                    }}
                                                    className="line-spacing-input"
                                                    min="1"
                                                    step="1"
                                                />
                                            </label>
                                        </div>
                                    ) : null}
                                    <button onClick={stopEditing} className="close-button">
                                        {language === 'es' ? 'Cerrar' : 'Close'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </aside>
        </div>
    );
}

export default PreviewA4;