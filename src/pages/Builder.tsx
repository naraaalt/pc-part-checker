import "../styles/builder.css"
import { useEffect, useState } from "react"

import ComponentRow from "../components/Builder/ComponentRow"
import SummaryPanel from "../components/Builder/SummaryPanel"
import BuilderHeader from "../components/Builder/BuilderHeader"

import { useBuild } from "../context/BuildContext"
import { useBlocker, useSearchParams, type Blocker } from "react-router-dom"
import { getBuild, saveBuild } from "../utils/buildStorage"
import ConfirmModal from "../components/Common/ConfirmModal"

import { cpus } from "../data/cpu"
import { gpus } from "../data/gpu"
import { motherboards } from "../data/motherboards"
import { rams } from "../data/ram"
import { storages } from "../data/storage"
import { psus } from "../data/psu"
import { cpuCoolers } from "../data/cpuCooler"
import { pcCases } from "../data/pcCase"
import { caseFans } from "../data/caseFan"
import { secondaryStorages } from "../data/secondaryStorage"
import SearchableSelect from "../components/Builder/SearchableSelect"

export default function Builder() {
  const {
    build,

    setBuild,
    resetBuild,
    isDirty,
    loadSnapshot,
    currentBuildId,
    setCurrentBuildId,
    setSavedSnapshot,
    isShared,
    setIsShared,
  } = useBuild()

  const [searchParams] = useSearchParams()
  const buildId = searchParams.get("id")
  const sharedHash = searchParams.get("build")

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return (
      isDirty &&
      (currentLocation.pathname !== nextLocation.pathname ||
        currentLocation.search !== nextLocation.search)
    )
  })

  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingBlocker, setPendingBlocker] = useState<Blocker | null>(null)

  useEffect(() => {
    if (blocker.state === "blocked") {
      setPendingBlocker(blocker)
      setShowConfirm(true)
    }
  }, [blocker.state])
  const [modalWarning, setModalWarning] = useState("")

  const handleSaveAndReturn = () => {
    if (!build.buildName || build.buildName.trim() === "") {
      setModalWarning("Please enter a build name before saving.")
      return
    }
    const saved = saveBuild(build)
    if (!saved) {
      setModalWarning("Failed to save — storage may be full.")
      return
    }
    if (!build.id) {
      setBuild((prev) => ({ ...prev, id: saved.id }))
      setCurrentBuildId(saved.id)
    }
    setSavedSnapshot(saved.build)
    setModalWarning("")
    pendingBlocker?.proceed?.()
    setShowConfirm(false)
  }

  const handleReturnWithoutSaving = () => {
    resetBuild()
    setModalWarning("")
    pendingBlocker?.proceed?.()
    setShowConfirm(false)
  }

  const handleStay = () => {
    setModalWarning("")
    pendingBlocker?.reset?.()
    setShowConfirm(false)
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isDirty])

  useEffect(() => {
    if (sharedHash) {
      import("../utils/shareUrl").then(({ decodeBuild }) => {
        const decoded = decodeBuild(sharedHash)
        if (decoded) {
          setBuild(decoded)
          setIsShared(true)
        }
      })
    } else if (buildId) {
      if (buildId !== currentBuildId) {
        const saved = getBuild(buildId)
        if (saved) {
          loadSnapshot(saved)
        }
      }
    }
    // Only reset when switching from a build URL to no build URL
    // (i.e., explicitly navigated to /builder without an id)
  }, [buildId, sharedHash])

  useEffect(() => {
    document.title = "Builder — PC Part Checker"
  }, [])

  // Socket mismatch auto-reset
  useEffect(() => {
    if (
      build.cpu &&
      build.motherboard &&
      build.cpu.socket !== build.motherboard.socket
    ) {
      setBuild((previous) => ({
        ...previous,
        motherboard: undefined,
        ram: undefined,
      }))
    }
  }, [build.cpu, build.motherboard, setBuild])

  // Parent part removal auto-resets
  useEffect(() => {
    if (!build.cpu && (build.motherboard || build.cooler)) {
      setBuild((previous) => ({
        ...previous,
        motherboard: undefined,
        cooler: undefined,
      }))
    }
  }, [build.cpu, build.motherboard, build.cooler, setBuild])

  useEffect(() => {
    if (!build.motherboard && (build.pcCase || build.storage2)) {
      setBuild((previous) => ({
        ...previous,
        pcCase: undefined,
        storage2: undefined,
      }))
    }
  }, [build.motherboard, build.pcCase, build.storage2, setBuild])

  useEffect(() => {
    if (!build.pcCase && build.caseFan) {
      setBuild((previous) => ({
        ...previous,
        caseFan: undefined,
      }))
    }
  }, [build.pcCase, build.caseFan, setBuild])

  // Mismatch auto-resets for new parts
  useEffect(() => {
    if (
      build.cpu &&
      build.cooler &&
      !build.cooler.sockets.includes(build.cpu.socket)
    ) {
      setBuild((previous) => ({
        ...previous,
        cooler: undefined,
      }))
    }
  }, [build.cpu, build.cooler, setBuild])

  useEffect(() => {
    if (
      build.motherboard &&
      build.pcCase &&
      !build.pcCase.supportedFormFactors.includes(build.motherboard.formFactor)
    ) {
      setBuild((previous) => ({
        ...previous,
        pcCase: undefined,
        caseFan: undefined,
      }))
    }
  }, [build.motherboard, build.pcCase, setBuild])

  useEffect(() => {
    if (
      build.pcCase &&
      build.caseFan &&
      !build.pcCase.fanSizes.includes(build.caseFan.size)
    ) {
      setBuild((previous) => ({
        ...previous,
        caseFan: undefined,
      }))
    }
  }, [build.pcCase, build.caseFan, setBuild])
  const filteredMotherboards = build.cpu
    ? motherboards.filter((board) => board.socket === build.cpu!.socket)
    : motherboards

  const filteredRam = build.motherboard
    ? rams.filter((ram) => ram.type === build.motherboard!.ramType)
    : rams

  const filteredCoolers = build.cpu
    ? cpuCoolers.filter((cooler) => cooler.sockets.includes(build.cpu!.socket))
    : cpuCoolers

  const filteredCases = build.motherboard
    ? pcCases.filter((c) =>
        c.supportedFormFactors.includes(build.motherboard!.formFactor)
      )
    : pcCases

  const filteredCaseFans = build.pcCase
    ? caseFans.filter((fan) => build.pcCase!.fanSizes.includes(fan.size))
    : caseFans

  let usedM2 = 0
  let usedSata = 0
  if (build.storage) {
    if (build.storage.type === "NVMe") usedM2 = 1
    else if (build.storage.type === "SATA SSD") usedSata = 1
  }
  const hasRemainingM2 = build.motherboard
    ? build.motherboard.m2Slots - usedM2 > 0
    : true
  const hasRemainingSata = build.motherboard
    ? build.motherboard.sataPorts - usedSata > 0
    : true

  const filteredStorage2 = secondaryStorages.filter((storage) => {
    if (storage.type === "NVMe") return hasRemainingM2
    if (storage.type === "SATA SSD") return hasRemainingSata
    return true
  })

  const storage2Disabled =
    !build.motherboard || (!hasRemainingM2 && !hasRemainingSata)

  let storage2Helper = "Select a motherboard first"
  if (build.motherboard) {
    const remainingM2 = Math.max(0, build.motherboard.m2Slots - usedM2)
    const remainingSata = Math.max(0, build.motherboard.sataPorts - usedSata)
    storage2Helper = `Remaining slots: ${remainingM2} M.2, ${remainingSata} SATA (${filteredStorage2.length} options)`
  }

  const requiredPower = (build.cpu?.tdp ?? 0) + (build.gpu?.power ?? 0)

  const filteredPsus = psus.filter((psu) => psu.wattage >= requiredPower + 150)

  return (
    <main className="builder-page">
      <div className="builder-container">
        <div className="builder-left">
          <BuilderHeader />

          <div className="builder-title">
            <span>BUILD EDITOR</span>

            <h1>Create Build</h1>

            <p>Select each component below to assemble your PC.</p>
          </div>

          <ComponentRow
            label="CPU"
            placeholder="Search CPU"
            options={cpus}
            value={build.cpu}
            disabled={isShared}
            onChange={(cpu) =>
              setBuild((previous) => ({
                ...previous,
                cpu,
              }))
            }
          />

          <ComponentRow
            label="Motherboard"
            placeholder="Search Motherboard"
            options={filteredMotherboards}
            value={build.motherboard}
            disabled={isShared || !build.cpu}
            disabledPlaceholder="Waiting for CPU..."
            helperText={
              build.cpu
                ? `Compatible with ${build.cpu.socket} (${filteredMotherboards.length} found)`
                : "Select a CPU first"
            }
            onChange={(motherboard) =>
              setBuild((previous) => ({
                ...previous,
                motherboard,
              }))
            }
          />

          <ComponentRow
            label="CPU Cooler"
            placeholder="Search CPU Cooler"
            options={filteredCoolers}
            value={build.cooler}
            disabled={isShared || !build.cpu}
            disabledPlaceholder="Waiting for CPU..."
            helperText={
              build.cpu
                ? `Compatible with ${build.cpu.socket} (${filteredCoolers.length} found)`
                : "Select a CPU first"
            }
            onChange={(cooler) =>
              setBuild((previous) => ({
                ...previous,
                cooler,
              }))
            }
          />

          <ComponentRow
            label="GPU"
            placeholder="Search GPU"
            options={gpus}
            value={build.gpu}
            disabled={isShared}
            onChange={(gpu) =>
              setBuild((previous) => ({
                ...previous,
                gpu,
              }))
            }
          />

          <ComponentRow
            label="Memory"
            placeholder="Search RAM"
            options={filteredRam}
            value={build.ram}
            disabled={isShared || !build.motherboard}
            disabledPlaceholder="Waiting for Motherboard..."
            helperText={
              build.motherboard
                ? `${build.motherboard.ramType} Memory (${filteredRam.length} found)`
                : "Select a motherboard first"
            }
            onChange={(ram) =>
              setBuild((previous) => ({
                ...previous,
                ram,
              }))
            }
          />

          <ComponentRow
            label="Storage"
            placeholder="Search Storage"
            options={storages}
            value={build.storage}
            disabled={isShared}
            onChange={(storage) =>
              setBuild((previous) => ({
                ...previous,
                storage,
              }))
            }
          />

          <ComponentRow
            label="Secondary Storage"
            placeholder="Search Secondary Storage"
            options={filteredStorage2}
            value={build.storage2}
            disabled={isShared || storage2Disabled}
            disabledPlaceholder="Waiting for Motherboard / Slots..."
            helperText={storage2Helper}
            onChange={(storage2) =>
              setBuild((previous) => ({
                ...previous,
                storage2,
              }))
            }
          />

          <ComponentRow
            label="PC Case"
            placeholder="Search PC Case"
            options={filteredCases}
            value={build.pcCase}
            disabled={isShared || !build.motherboard}
            disabledPlaceholder="Waiting for Motherboard..."
            helperText={
              build.motherboard
                ? `Supports ${build.motherboard.formFactor} (${filteredCases.length} found)`
                : "Select a motherboard first"
            }
            onChange={(pcCase) =>
              setBuild((previous) => ({
                ...previous,
                pcCase,
              }))
            }
          />

          <div className="component-row">
            <label>Case Fans</label>
            {build.pcCase && (
              <small className="component-text">
                {build.pcCase.fanSizes.map((s) => `${s}mm`).join(", ")} slots,
                max {build.pcCase.maxCaseFans} fans
              </small>
            )}
            {!build.pcCase && (
              <small className="component-text">Select a PC Case first</small>
            )}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <SearchableSelect
                  placeholder="Search Case Fans"
                  disabledPlaceholder="Waiting for PC Case..."
                  options={filteredCaseFans}
                  value={build.caseFan}
                  disabled={isShared || !build.pcCase}
                  onChange={(fan) =>
                    setBuild((previous) => ({
                      ...previous,
                      caseFan: {
                        ...fan,
                        count: previous.caseFan?.count ?? 1,
                      },
                    }))
                  }
                />
              </div>
              {build.caseFan && (
                <input
                  type="number"
                  min={1}
                  max={build.pcCase?.maxCaseFans ?? 12}
                  value={build.caseFan.count}
                  disabled={isShared}
                  className="fan-count-input"
                  onChange={(e) => {
                    const count = Math.max(
                      1,
                      Math.min(
                        build.pcCase?.maxCaseFans ?? 12,
                        parseInt(e.target.value) || 1
                      )
                    )
                    setBuild((previous) => ({
                      ...previous,
                      caseFan: previous.caseFan
                        ? { ...previous.caseFan, count }
                        : undefined,
                    }))
                  }}
                />
              )}
            </div>
          </div>

          <ComponentRow
            label="Power Supply"
            placeholder="Search PSU"
            options={filteredPsus}
            value={build.psu}
            disabled={isShared}
            helperText={
              requiredPower > 0
                ? `Recommended ≥ ${requiredPower + 150}W`
                : "Select CPU and GPU for recommendation"
            }
            onChange={(psu) =>
              setBuild((previous) => ({
                ...previous,
                psu,
              }))
            }
          />
        </div>

        <SummaryPanel />

        {showConfirm && (
          <ConfirmModal
            open={showConfirm}
            title="RETURN HOME"
            message="You have unsaved changes."
            warning={modalWarning}
            btnSaveLabel="save & exit"
            btnDiscardLabel="discard & exit"
            btnCancelLabel="cancel"
            onSave={handleSaveAndReturn}
            onDiscard={handleReturnWithoutSaving}
            onCancel={handleStay}
          />
        )}
      </div>
    </main>
  )
}
