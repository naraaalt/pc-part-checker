import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function TerminalMenu() {

    const [hovered, setHovered] = useState(-1);

      const navigate = useNavigate();

    const menu = [
        {
            text: "create build",
            path: "/builder"
        },
        {
            text: "browse builds",
            path: "/builds"
        },
        {
            text: "documentation",
            path: "/docs"
        }
];

  

    return (

        <nav className="terminal-menu">

            {menu.map((item, index) => (

                <div
                    key={item.text}
                    className="terminal-link"
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(-1)}
                    onClick={() => navigate(item.path)}
                >

                    {hovered === index ? ">" : " "}

                    {" "}

                    {item.text}

                </div>

            ))}

        </nav>

    );

}