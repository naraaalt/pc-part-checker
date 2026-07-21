import { Outlet } from "react-router-dom"
import StatusBar from "./components/StatusBar"
import FooterBar from "./components/FooterBar"

export default function App() {
  return (
    <>
      <StatusBar />
      <Outlet />
      <FooterBar />
    </>
  )
}
