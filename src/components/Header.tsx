import { useEffect, useState } from 'react';
import Moon from "./Moon";
import Sun from "./Sun";
import './Header.css';
export function Header() {
    const [darkMode, setDarkMode] = useState(false);
    
     useEffect(() => {
        document.body.classList.toggle('mode-black', darkMode);
    }, [darkMode]);


    return (
        <header className="countries__header">
            <h1 className="countries__where">Where in the world?</h1>
            <button 
            onClick={() => setDarkMode(!darkMode)}
            className="countries__dark-light-mode" type="button">
                {darkMode ? <Sun /> : <Moon />} {darkMode ? 'Light' : 'Dark'} Mode
            </button>
        </header>
    );
}