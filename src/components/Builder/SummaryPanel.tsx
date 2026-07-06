import { useBuild } from "../../context/BuildContext";
import { useState } from "react";
import { calculatePrice } from "../../utils/calculatePrice";
import { calculatePower } from "../../utils/calculatePower";
import { checkCompatibility } from "../../utils/checkCompatibility";
import TerminalInput from "../Common/TerminalInput";
import BuildActions from "./BuildActions";
export default function SummaryPanel() {

    const { build, setBuild } = useBuild();

    const selectedParts = [
        build.cpu,
        build.motherboard,
        build.gpu,
        build.ram,
        build.storage,
        build.psu,
    ].filter(Boolean).length;

    const totalPrice = calculatePrice(build);

    const totalPower = calculatePower(build);

    const compatibility  = checkCompatibility(build);

    const [expanded, setExpanded] = useState<string | null>(null);

    const toggle = (section: string) => {

        setExpanded(current =>
            current === section ? null : section
        );

    };

    return (

        <aside className="summary-panel">

            <h2>CURRENT BUILD</h2>
                <div className="build-name">

                    <span>

                        NAME

                    </span>

                        <TerminalInput
                            value={build.buildName}
                            placeholder="Untitled Build"
                            maxLength={30}
                            onChange={(value) =>

                                setBuild({

                                    ...build,

                                    buildName: value,

                                })

                            }
                        />

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

                        ["Price", `$${build.cpu.price}`],

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
                        ["Price", `$${build.motherboard.price}`],
                    ]
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
                        ["Price", `$${build.gpu.price}`],
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
                        ["Price", `$${build.ram.price}`],
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
                        ["Price", `$${build.storage.price}`],
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
                        ["Modular", build.psu.modular ? "Yes" : "No"],
                        ["Price", `$${build.psu.price}`],
                    ]
                }

            />

            <hr />

            {/* Compatibility overall status removed per new UX */}
            {/* Diagnostics: only show when there are warnings or issues */}
            {(() => {
                const filtered = compatibility.diagnostics.filter(d => d.status !== "pass");
                if (filtered.length === 0) return null;
                const hasFail = filtered.some(d => d.status === "fail");
                const heading = hasFail ? "Issues" : "Warnings";
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
                );
            })()}


            <BuildItem
                label="Power"
                value={`${totalPower} W`}
            />

            <BuildItem
                label="Price"
                value={`$${totalPrice}`}
            />

            <BuildItem
                label="Parts"
                value={`${selectedParts} / 6`}
            />

            <hr />

            <div className="summary-section-title">

                BUILD ACTIONS

            </div>

            <BuildActions />
        </aside>

    );

}

type ExpandableProps = {

    id: string;

    label: string;

    value?: string;

    specs?: [string, string | number][];

    expanded: boolean;

    onToggle: () => void;

};

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

                <div
                    className="spec-toggle"
                    onClick={onToggle}
                >

                    {expanded
                        ? "▼ Hide Specifications"
                        : "► View Specifications"}

                </div>

            )}

            {expanded && specs && (

                <div className="spec-list">

                    {specs.map(([key, value]) => (

                        <div
                            key={key}
                            className="spec-row"
                        >

                            <span>{key}</span>

                            <span>{value}</span>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

type ItemProps = {

    label: string;

    value?: string;

    green?: boolean;

    red?: boolean;

};

function BuildItem({

    label,

    value,

    green,

    red,

}: ItemProps) {

    return (

        <div className="summary-item">

            <span>{label}</span>

            <span
                className={
                    green
                        ? "green"
                        : red
                        ? "red"
                        : ""
                }
            >

                {value ?? "--"}

            </span>

        </div>

    );

}