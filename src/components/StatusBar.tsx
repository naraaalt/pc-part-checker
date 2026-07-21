export default function StatusBar() {
  const today = new Date()

  return (
    <header className="status-bar">
      <div>PC PART COMPATIBILITY CHECKER</div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>{today.toLocaleDateString()}</span>
      </div>
    </header>
  )
}
