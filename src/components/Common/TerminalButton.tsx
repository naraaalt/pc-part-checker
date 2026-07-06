import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./terminalButton.css";

type Props = {

    children: React.ReactNode;

    onClick?: () => void;

    className?: string;

    navigateTo?: string;

    loadingText?: string;

};

export default function TerminalButton({

    children,

    onClick,

    className = "",

    navigateTo,

    loadingText = "exiting builder...",

}: Props) {

    const navigate = useNavigate();

    const [typing, setTyping] = useState(false);

    const [displayText, setDisplayText] = useState("");

    useEffect(() => {

        if (!typing) return;

        let index = 0;

        setDisplayText("");

        const interval = setInterval(() => {

            index++;

            setDisplayText(loadingText.slice(0, index));

            if (index >= loadingText.length) {

                clearInterval(interval);

                setTimeout(() => {

                    if (navigateTo) {

                        navigate(navigateTo);

                    } else {

                        onClick?.();

                    }
                    
                    setTyping(false);

                }, 500);

            }

        }, 45);

        return () => clearInterval(interval);

    }, [typing]);

    const handleClick = async () => {

        if (typing) return;

        if (navigateTo || loadingText) {

            setTyping(true);

        } else {

            await onClick?.();

        }

    };

    return (

        <button
            className={`terminal-button ${className} ${typing ? "typing" : ""}`}
            onClick={handleClick}
            disabled={typing}
        >

            <span className="terminal-button-text">

                {typing
                    ? displayText
                    : children}

            </span>

        </button>

    );

}