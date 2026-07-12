import { useEffect, useState } from "react";

export default function StatusBar() {

    const today = new Date();
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "light") {
            setIsLight(true);
            document.documentElement.classList.add("light-theme");
        }
    }, []);

    const toggleTheme = () => {
        if (isLight) {
            document.documentElement.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
            setIsLight(false);
        } else {
            document.documentElement.classList.add("light-theme");
            localStorage.setItem("theme", "light");
            setIsLight(true);
        }
    };

    return (

        <header className="status-bar">

            <div>

                PC PART COMPATIBILITY CHECKER

            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <button 
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                >
                    {isLight ? "DARK MODE" : "LIGHT MODE"}
                </button>
                <span>{today.toLocaleDateString()}</span>
            </div>

        </header>

    );

}