import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Hero from "../components/Hero"
import LetterGlitch from "../components/LetterGlitch"
import BootSequence from "../components/BootSequence"
import TerminalMenu from "../components/TerminalMenu"
import FeatureCard from "../components/FeatureCard"

import { getBuilds } from "../utils/buildStorage"
import { cpus } from "../data/cpu"
import { gpus } from "../data/gpu"
import { motherboards } from "../data/motherboards"

export default function Home() {
  const [ready, setReady] = useState(false)
  const [savedBuildsCount, setSavedBuildsCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    setSavedBuildsCount(getBuilds().length)
  }, [])

  useEffect(() => {
    document.title = "PC Part Compatibility Checker"
  }, [])

  return (
    <main className="home">
      <LetterGlitch
        glitchColors={["#bababa", "#6b6b6b", "#383838"]}
        glitchSpeed={40}
        smooth={false}
        centerVignette={true}
        outerVignette={true}
      />

      <div className="overlay">
        <Hero />

        {!ready ? (
          <BootSequence onComplete={() => setReady(true)} />
        ) : (
          <>
            <TerminalMenu />

            <section className="cards">
              <FeatureCard
                title="My Builds"
                onClick={() => navigate("/builds")}
                lines={[
                  "Saved Configurations",
                  "",
                  `TOTAL : ${savedBuildsCount}`,
                  "",
                  "STATUS : SYNCED",
                ]}
              />

              <FeatureCard
                title="Compatibility"
                lines={[
                  "✓ CPU Socket",
                  "✓ RAM Type",
                  "✓ PCIe Check",
                  "",
                  "STATUS : ACTIVE",
                ]}
              />

              <FeatureCard
                title="Database"
                lines={[
                  `CPU : ${cpus.length} indexed`,
                  `GPU : ${gpus.length} indexed`,
                  `BOARD : ${motherboards.length} indexed`,
                  "",
                  "STATUS : ONLINE",
                ]}
              />
            </section>
          </>
        )}
      </div>
    </main>
  )
}
