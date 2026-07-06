import { useRef, useState } from "react";

import "./terminalInput.css";

type Props = {

    value: string;

    onChange: (value: string) => void;

    placeholder?: string;

    maxLength?: number;

};

export default function TerminalInput({

    value,

    onChange,

    placeholder = "",

    maxLength,

}: Props) {

    const inputRef = useRef<HTMLInputElement>(null);

    const [focused, setFocused] = useState(false);

    return (

        <div
            className={`terminal-input ${focused ? "focused" : ""}`}
            onClick={() => inputRef.current?.focus()}
        >

            <span className="terminal-prefix">

                &gt;

            </span>

            <div className="terminal-display">

                <span className={value ? "terminal-text" : "terminal-placeholder"}>

                    {value || (focused ? "" : placeholder)}

                </span>

                {focused && (

                    <span className="terminal-cursor">

                        ▌

                    </span>

                )}

            </div>

            <input
                ref={inputRef}
                className="terminal-hidden-input"
                value={value}
                maxLength={maxLength}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => onChange(e.target.value)}
            />

        </div>

    );

}