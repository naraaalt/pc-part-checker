import { useEffect, useState } from "react";

const bootLines = [
    "Initializing Compatibility Engine...",
    "Loading CPU Database...",
    "Loading GPU Database...",
    "Loading Motherboard Database...",
    "Loading RAM Database...",
    "Loading PSU Database...",
    "",
    "System Ready."
];

type Props = {
    onComplete: () => void;
};

export default function BootSequence({ onComplete }: Props) {

    const [visibleLines, setVisibleLines] = useState<string[]>([]);

    useEffect(() => {

        let index = 0;

        const timer = setInterval(() => {

            setVisibleLines(prev => [...prev, bootLines[index]]);

            index++;

            if (index === bootLines.length) {

                clearInterval(timer);

                setTimeout(() => {

                    onComplete();

                }, 600);

            }

        }, 450);

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="boot-sequence">

            {visibleLines.map((line, index) => (

                <p key={index}>{line}</p>

            ))}

        </div>

    );

}