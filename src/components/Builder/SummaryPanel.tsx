import { useBuild } from "../../context/BuildContext"
import { useState } from "react"
import { calculatePrice } from "../../utils/calculatePrice"
import { calculatePower } from "../../utils/calculatePower"
import { checkCompatibility } from "../../utils/checkCompatibility"
import { formatPrice } from "../../utils/formatPrice"
import TerminalInput from "../Common/TerminalInput"
import BuildActions from "./BuildActions"
import { PART_KEYS } from "../../types/Build"
export default function SummaryPanel() {
  const { build, setBuild, isShared } = useBuild()

  const selectedParts = PART_KEYS.filter((key) => build[key]).length

  const totalPrice = calculatePrice(build)

  const totalPower = calculatePower(build)

  const compatibility = checkCompatibility(build)

  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (section: string) => {
    setExpanded((current) => (current === section ? null : section))
  }

  return (
    <aside className="summary-panel">
      <h2>{isShared ? "SHARED BUILD" : "CURRENT BUILD"}</h2>
      <div className="build-name">
        <span>NAME</span>
        {isShared ? (
          <span className="build-name-display-text">{build.buildName}</span>
        ) : (
          <TerminalInput
            value={build.buildName}
            placeholder="Untitled Build"
            maxLength={30}
            onChange={(value) =>
              setBuild((prev) => ({
                ...prev,

                buildName: value,
              }))
            }
          />
        )}
      </div>
      <hr />

      <ExpandableBuildItem
        id="cpu"

        label="CPU"

        value={build.cpu?.name}

        expanded={expanded === "cpu"}

        onToggle={() => toggle("cpu")}

        specs={
          build.cpu && [
            ["Brand", build.cpu.brand],

            ["Socket", build.cpu.socket],

            ["Cores", build.cpu.cores],

            ["Threads", build.cpu.threads],

            ["TDP", `${build.cpu.tdp} W`],

            ["Price", formatPrice(build.cpu.price)],
          ]
        }
      />

      <ExpandableBuildItem
        id="motherboard"
        label="Motherboard"
        value={build.motherboard?.name}
        expanded={expanded === "motherboard"}
        onToggle={() => toggle("motherboard")}
        specs={
          build.motherboard && [
            ["Brand", build.motherboard.brand],
            ["Socket", build.motherboard.socket],
            ["Form Factor", build.motherboard.formFactor],
            ["RAM Type", build.motherboard.ramType],
            ["RAM Slots", build.motherboard.ramSlots],
            ["Max Memory", `${build.motherboard.maxMemory} GB`],
            ["PCIe", build.motherboard.pcie],
            ["M.2 Slots", build.motherboard.m2Slots],
            ["SATA Ports", build.motherboard.sataPorts],
            ["WiFi", build.motherboard.wifi ? "Yes" : "No"],
            ["Price", formatPrice(build.motherboard.price)],
          ]
        }
      />

      <ExpandableBuildItem
        id="cooler"
        label="CPU Cooler"
        value={build.cooler?.name}
        expanded={expanded === "cooler"}
        onToggle={() => toggle("cooler")}
        specs={
          build.cooler &&
          ([
            ["Brand", build.cooler.brand],
            ["Type", build.cooler.type],
            ["Sockets", build.cooler.sockets.join(", ")],
            ["TDP Rating", `${build.cooler.tdpRating} W`],
            ...(build.cooler.type === "Air" && build.cooler.height
              ? [["Height", `${build.cooler.height} mm`]]
              : []),
            ...(build.cooler.type === "AIO" && build.cooler.radiatorSize
              ? [["Radiator Size", `${build.cooler.radiatorSize} mm`]]
              : []),
            ["Fans", build.cooler.fans],
            ["Price", formatPrice(build.cooler.price)],
          ] as [string, string | number][])
        }
      />

      <ExpandableBuildItem
        id="gpu"

        label="GPU"
        value={build.gpu?.name}
        expanded={expanded === "gpu"}
        onToggle={() => toggle("gpu")}
        specs={
          build.gpu && [
            ["Brand", build.gpu.brand],
            ["VRAM", `${build.gpu.memory} GB`],
            ["Memory Type", build.gpu.memoryType],
            ["TDP", `${build.gpu.power} W`],
            ["PCIe", build.gpu.pcie],
            ["Price", formatPrice(build.gpu.price)],
          ]
        }
      />

      <ExpandableBuildItem
        id="ram"

        label="Memory"
        value={build.ram?.name}
        expanded={expanded === "ram"}
        onToggle={() => toggle("ram")}
        specs={
          build.ram && [
            ["Brand", build.ram.brand],
            ["Type", build.ram.type],
            ["Capacity", `${build.ram.capacity} GB`],
            ["Speed", `${build.ram.speed} MHz`],
            ["Price", formatPrice(build.ram.price)],
          ]
        }
      />

      <ExpandableBuildItem
        id="storage"

        label="Storage"
        value={build.storage?.name}
        expanded={expanded === "storage"}
        onToggle={() => toggle("storage")}
        specs={
          build.storage && [
            ["Brand", build.storage.brand],
            ["Type", build.storage.type],
            ["Capacity", `${build.storage.capacity} GB`],
            ["Interface", build.storage.interface],
            ["Read Speed", `${build.storage.readSpeed} MB/s`],
            ["Write Speed", `${build.storage.writeSpeed} MB/s`],
            ["Price", formatPrice(build.storage.price)],
          ]
        }
      />

      <ExpandableBuildItem
        id="storage2"
        label="Secondary Storage"
        value={build.storage2?.name}
        expanded={expanded === "storage2"}
        onToggle={() => toggle("storage2")}
        specs={
          build.storage2 && [
            ["Brand", build.storage2.brand],
            ["Type", build.storage2.type],
            ["Capacity", `${build.storage2.capacity} GB`],
            ["Interface", build.storage2.interface],
            ["Read Speed", `${build.storage2.readSpeed} MB/s`],
            ["Write Speed", `${build.storage2.writeSpeed} MB/s`],
            ["Price", formatPrice(build.storage2.price)],
          ]
        }
      />

      <ExpandableBuildItem
        id="pcCase"
        label="PC Case"
        value={build.pcCase?.name}
        expanded={expanded === "pcCase"}
        onToggle={() => toggle("pcCase")}
        specs={
          build.pcCase && [
            ["Brand", build.pcCase.brand],
            ["Form Factors", build.pcCase.supportedFormFactors.join(", ")],
            ["Max GPU Length", `${build.pcCase.maxGpuLength} mm`],
            ["Max Cooler Height", `${build.pcCase.maxCoolerHeight} mm`],
            [
              "PSU Form Factors",
              build.pcCase.supportedPsuFormFactors.join(", "),
            ],
            ["Max Case Fans", build.pcCase.maxCaseFans],
            [
              "Fan Sizes",
              build.pcCase.fanSizes.map((s) => `${s}mm`).join(", "),
            ],
            ["Price", formatPrice(build.pcCase.price)],
          ]
        }
      />

      <ExpandableBuildItem
        id="caseFan"
        label="Case Fans"
        value={
          build.caseFan
            ? `${build.caseFan.count} × ${build.caseFan.name}`
            : undefined
        }
        expanded={expanded === "caseFan"}
        onToggle={() => toggle("caseFan")}
        specs={
          build.caseFan && [
            ["Brand", build.caseFan.brand],
            ["Size", `${build.caseFan.size} mm`],
            ["Quantity", build.caseFan.count],
            ["RPM", `${build.caseFan.rpm} RPM`],
            ["Airflow", `${build.caseFan.airflow} CFM`],
            ["Noise", `${build.caseFan.noise} dBA`],
            ["Price", formatPrice(build.caseFan.price * build.caseFan.count)],
          ]
        }
      />

      <ExpandableBuildItem
        id="psu"
        label="Power Supply"
        value={build.psu?.name}
        expanded={expanded === "psu"}
        onToggle={() => toggle("psu")}
        specs={
          build.psu && [
            ["Brand", build.psu.brand],
            ["Wattage", `${build.psu.wattage} W`],
            ["Efficiency", build.psu.efficiency],
            ["Modular", build.psu.modular],
            ["Price", formatPrice(build.psu.price)],
          ]
        }
      />

      <hr />

      {/* Compatibility overall status removed per new UX */}
      {/* Diagnostics: only show when there are warnings or issues */}
      {(() => {
        const filtered = compatibility.diagnostics.filter(
          (d) => d.status !== "pass"
        )
        if (filtered.length === 0) return null
        const hasFail = filtered.some((d) => d.status === "fail")
        const heading = hasFail ? "Issues" : "Warnings"
        return (
          <div className="diagnostics">
            <strong>{heading}</strong>
            {filtered.map((item) => (
              <div key={item.name} className={`diagnostic ${item.status}`}>
                <span>
                  {item.status === "fail" && "[✗]"}
                  {item.status === "warning" && "[!]"}
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        )
      })()}

      <BuildItem label="Power" value={`${totalPower} W`} />

      <BuildItem label="Price" value={formatPrice(totalPrice)} />

      <BuildItem label="Parts" value={`${selectedParts} / 10`} />

      <hr />

      <div className="summary-section-title">BUILD ACTIONS</div>

      <BuildActions />
    </aside>
  )
}

type ExpandableProps = {
  id: string

  label: string

  value?: string

  specs?: [string, string | number][]

  expanded: boolean

  onToggle: () => void
}

function ExpandableBuildItem({
  label,

  value,

  specs,

  expanded,

  onToggle,
}: ExpandableProps) {
  return (
    <div className="expandable-item">
      <div className="summary-item">
        <span className="boldspan">{label}</span>

        <span>{value ?? "--"}</span>
      </div>

      {specs && (
        <div className="spec-toggle" onClick={onToggle}>
          {expanded ? "▼ Hide Specifications" : "► View Specifications"}
        </div>
      )}

      {expanded && specs && (
        <div className="spec-list">
          {specs.map(([key, value]) => (
            <div key={key} className="spec-row">
              <span>{key}</span>

              <span>{value}</span>
            </div>
          ))}

          {value && (
            <div className="spec-row" style={{ marginTop: "10px" }}>
              <span>Buy</span>
              <a
                href={`https://www.amazon.com/s?k=${encodeURIComponent(value)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "underline" }}
              >
                Search on Amazon ↗
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

type ItemProps = {
  label: string

  value?: string

  green?: boolean

  red?: boolean
}

function BuildItem({
  label,

  value,

  green,

  red,
}: ItemProps) {
  return (
    <div className="summary-item">
      <span>{label}</span>

      <span className={green ? "green" : red ? "red" : ""}>
        {value ?? "--"}
      </span>
    </div>
  )
}
