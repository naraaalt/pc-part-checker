import { useEffect, useState } from "react"

import "./terminalButton.css"

type Props = {
  children: React.ReactNode

  onClick?: () => void

  className?: string

  loadingText?: string
}

export default function TerminalButton({
  children,

  onClick,

  className = "",

  loadingText = "exiting builder...",
}: Props) {
  const [typing, setTyping] = useState(false)

  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    if (!typing) return

    let index = 0

    setDisplayText("")

    const interval = setInterval(() => {
      index++

      setDisplayText(loadingText.slice(0, index))

      if (index >= loadingText.length) {
        clearInterval(interval)

        setTimeout(() => {
          onClick?.()

          setTyping(false)
        }, 500)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [typing])

  const handleClick = async () => {
    if (typing) return

    if (loadingText) {
      setTyping(true)
    } else {
      await onClick?.()
    }
  }

  return (
    <button
      className={`terminal-button ${className} ${typing ? "typing" : ""}`}
      onClick={handleClick}
      disabled={typing}
    >
      <span className="terminal-button-text">
        {typing ? displayText : children}
      </span>
    </button>
  )
}
