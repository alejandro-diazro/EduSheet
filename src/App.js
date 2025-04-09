// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import Menu from "./components/Menu/Menu";
import PreviewA4 from "./components/PreviewA4/PreviewA4";

function App() {
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('es');
    const [exercises, setExercises] = useState([]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const translations = {
        es: { title: 'EduSheet', addExercise: 'Añadir ejercicio' },
        en: { title: 'EduSheet', addExercise: 'Add exercise' },
    };

    return (
        <div className={`App ${theme}`}>
            <header>
                <h1>{translations[language].title}</h1>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <LanguageSelector language={language} setLanguage={setLanguage} />
            </header>
            <div className="main-container">
                <Menu setExercises={setExercises} language={language} translations={translations} />
                <PreviewA4 exercises={exercises} setExercises={setExercises} language={language} />
            </div>
        </div>
    );
}

export default App;