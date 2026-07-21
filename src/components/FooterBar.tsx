import { VERSION } from "../constants"

export default function FooterBar() {
  return (
    <footer className="footer-bar">
      <span>STATUS : ONLINE</span>

      <span>VERSION {VERSION}</span>
    </footer>
  )
}
