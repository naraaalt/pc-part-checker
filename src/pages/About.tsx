import { useNavigate } from "react-router-dom"
import TerminalButton from "../components/Common/TerminalButton"
import { VERSION } from "../constants"
import "./../styles/about.css"

export default function About() {
  const navigate = useNavigate()

  return (
    <main className="about-page">
      <div className="about-window">
        <div className="about-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="about-bar-title">sys:/about</span>
        </div>

        <div className="about-body">
          <h1 className="about-title">PC PART CHECKER v{VERSION}</h1>

          <section className="about-section">
            <h2>// PURPOSE</h2>
            <p>
              A tool to design and validate PC builds. It verifies compatibility
              between components in real-time, ensuring your parts will work
              together before you buy them.
            </p>
          </section>

          <section className="about-section">
            <h2>// HOW IT WORKS</h2>
            <ul className="about-list">
              <li>
                <span>[CPU + MOB]</span> Validates socket types (e.g., AM5,
                LGA1700)
              </li>
              <li>
                <span>[RAM + MOB]</span> Verifies DDR generation compatibility
                (DDR4 vs DDR5)
              </li>
              <li>
                <span>[POWER]</span> Calculates total wattage and checks PSU
                headroom
              </li>
            </ul>
          </section>

          <section className="about-section">
            <h2>// TECH STACK</h2>
            <div className="tech-grid">
              <span>React 19</span>
              <span>TypeScript</span>
              <span>Vite</span>
              <span>React Router</span>
            </div>
          </section>

          <div className="about-actions">
            <TerminalButton
              onClick={() => navigate("/")}
              loadingText="returning..."
            >
              go back
            </TerminalButton>
          </div>
        </div>
      </div>
    </main>
  )
}
