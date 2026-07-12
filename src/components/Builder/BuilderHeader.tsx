import { useNavigate } from "react-router-dom";

import TerminalButton from "../Common/TerminalButton";

export default function BuilderHeader() {

    const navigate = useNavigate();

    return (

        <header className="builder-header">

            <TerminalButton
                className="terminal-link"
                onClick={() => navigate("/")}
                loadingText="returning home..."
            >

                return home

            </TerminalButton>

        </header>

    );

}