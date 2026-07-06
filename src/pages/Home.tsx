import { useState } from "react";

import Hero from "../components/Hero";
import LetterGlitch from "../components/LetterGlitch";
import BootSequence from "../components/BootSequence";
import TerminalMenu from "../components/TerminalMenu";
import FeatureCard from "../components/FeatureCard";
import StatusBar from "../components/StatusBar";
import FooterBar from "../components/FooterBar";

export default function Home() {

    const [ready, setReady] = useState(false);

    return (

        <main className="home">

        <title>PC Part Compatibility Checker</title>

        <LetterGlitch
            glitchColors={["#bababa", "#6b6b6b", "#383838"]}
            glitchSpeed={40}
            smooth={false}
            centerVignette={true}
            outerVignette={true}
        />

            <StatusBar />

            <div className="overlay">

                <Hero />

                {!ready ? (

                    <BootSequence
                        onComplete={() => setReady(true)}
                    />

                ) : (

                    <>
                        <TerminalMenu />

                        <section className="cards">

                            <FeatureCard
                                title="Compatibility"
                                lines={[
                                    "✓ CPU Socket",
                                    "✓ RAM Type",
                                    "✓ PCIe Check",
                                    "",
                                    "STATUS : READY"
                                ]}
                            />

                            <FeatureCard
                                title="Power"
                                lines={[
                                    "CPU : -- W",
                                    "GPU : -- W",
                                    "TOTAL : -- W",
                                    "",
                                    "PSU : UNKNOWN"
                                ]}
                            />

                            <FeatureCard
                                title="Database"
                                lines={[
                                    "CPU : ---",
                                    "GPU : ---",
                                    "BOARD : ---",
                                    "",
                                    "ONLINE"
                                ]}
                            />

                        </section>
                    </>

                )}

            </div>

            <FooterBar />

        </main>

    );

}