import { useLocation, useNavigate } from "react-router-dom"
import "./../styles/notFound.css"
import TerminalButton from "../components/Common/TerminalButton"

export default function NotFound() {
  const location = useLocation()
  const navigate = useNavigate()
  const requested = location.pathname

  return (
    <main className="notfound-page">
      <div className="notfound-window">
        <div className="notfound-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="notfound-bar-title">sys:/{requested}</span>
        </div>

        <div className="notfound-body">
          <div className="notfound-code">
            <span className="notfound-404">404</span>
            <span className="notfound-sep">//</span>
            <span className="notfound-doc">PAGE_OFFLINE</span>
          </div>

          <div className="notfound-gif-frame">
            <img
              src="/animations/sleepy.webp"
              alt="A tired developer asleep at their desk"
              className="notfound-gif"
            />
          </div>

          <p className="notfound-message">
            still working on it...<span className="notfound-cursor">_</span>
          </p>

          <TerminalButton
            onClick={() => navigate("/")}
            loadingText="going back..."
          >
            go back
          </TerminalButton>
        </div>
      </div>
    </main>
  )
}
