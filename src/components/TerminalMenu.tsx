import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBuild } from "../context/BuildContext"
import { saveBuild } from "../utils/buildStorage"
import ConfirmModal from "./Common/ConfirmModal"

export default function TerminalMenu() {
  const [hovered, setHovered] = useState(-1)
  const [showModal, setShowModal] = useState(false)
  const [modalWarning, setModalWarning] = useState("")
  const navigate = useNavigate()
  const { build, isDirty, resetBuild } = useBuild()

  const menu = [
    {
      text: "create build",
      path: "/builder",
    },
    {
      text: "browse builds",
      path: "/builds",
    },
    {
      text: "compare builds",
      path: "/compare",
    },
    {
      text: "about",
      path: "/about",
    },
  ]

  const handleNavigate = (path: string) => {
    if (path === "/builder") {
      if (isDirty) {
        setShowModal(true)
      } else {
        resetBuild()
        navigate(path)
      }
    } else {
      navigate(path)
    }
  }

  const handleSaveAndNew = () => {
    if (!build.buildName || build.buildName.trim() === "") {
      setModalWarning("Please enter a build name before saving.")
      return
    }
    saveBuild(build)
    setModalWarning("")
    resetBuild()
    setShowModal(false)
    navigate("/builder")
  }

  const handleDiscardAndNew = () => {
    setModalWarning("")
    resetBuild()
    setShowModal(false)
    navigate("/builder")
  }

  const handleCancel = () => {
    setModalWarning("")
    setShowModal(false)
  }

  return (
    <>
      <nav className="terminal-menu">
        {menu.map((item, index) => (
          <div
            key={item.text}
            className="terminal-link"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(-1)}
            onClick={() => handleNavigate(item.path)}
          >
            {hovered === index ? ">" : " "} {item.text}
          </div>
        ))}
      </nav>

      <ConfirmModal
        open={showModal}
        title="NEW BUILD"
        message="You have unsaved changes."
        warning={modalWarning}
        btnSaveLabel="save & new"
        btnDiscardLabel="discard & new"
        btnCancelLabel="cancel"
        onSave={handleSaveAndNew}
        onDiscard={handleDiscardAndNew}
        onCancel={handleCancel}
      />
    </>
  )
}
