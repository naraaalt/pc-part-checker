import { useState, useEffect } from "react";
import { getBuilds } from "../utils/buildStorage";
import type { BuildSave } from "../types/BuildSave";
import BuilderHeader from "../components/Builder/BuilderHeader";
import { calculatePrice } from "../utils/calculatePrice";
import { calculatePower } from "../utils/calculatePower";
import "../styles/compare.css";

export default function Compare() {
    const [builds, setBuilds] = useState<BuildSave[]>([]);
    const [build1Id, setBuild1Id] = useState<string>("");
    const [build2Id, setBuild2Id] = useState<string>("");

    useEffect(() => {
        const savedBuilds = getBuilds();
        setBuilds(savedBuilds);
        if (savedBuilds.length >= 2) {
            setBuild1Id(savedBuilds[0].id!);
            setBuild2Id(savedBuilds[1].id!);
        } else if (savedBuilds.length === 1) {
            setBuild1Id(savedBuilds[0].id!);
        }
    }, []);

    useEffect(() => {
        document.title = "Compare Builds — PC Part Checker";
    }, []);

    const build1 = builds.find(b => b.id === build1Id);
    const build2 = builds.find(b => b.id === build2Id);

    return (
        <main className="compare-page">

            <div className="compare-container">
                <BuilderHeader />
                
                <div className="compare-title">
                    <span>SIDE-BY-SIDE</span>
                    <h1>Compare Builds</h1>
                    <p>Compare components, price, and power between two saved builds.</p>
                </div>

                {builds.length < 2 ? (
                    <div className="compare-empty">
                        <p>You need at least 2 saved builds to compare.</p>
                    </div>
                ) : (
                    <div className="compare-content">
                        <div className="compare-selectors">
                            <div className="selector-group">
                                <label>Build 1</label>
                                <select 
                                    className="compare-select" 
                                    value={build1Id} 
                                    onChange={(e) => setBuild1Id(e.target.value)}
                                >
                                    {builds.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="selector-group">
                                <label>Build 2</label>
                                <select 
                                    className="compare-select" 
                                    value={build2Id} 
                                    onChange={(e) => setBuild2Id(e.target.value)}
                                >
                                    {builds.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {build1 && build2 && (
                            <div className="compare-table-wrapper">
                                <table className="compare-table">
                                    <thead>
                                        <tr>
                                            <th>Component</th>
                                            <th>{build1.name}</th>
                                            <th>{build2.name}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CPU</td>
                                            <td>{build1.build.cpu?.name || "--"}</td>
                                            <td>{build2.build.cpu?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>Motherboard</td>
                                            <td>{build1.build.motherboard?.name || "--"}</td>
                                            <td>{build2.build.motherboard?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>Memory</td>
                                            <td>{build1.build.ram?.name || "--"}</td>
                                            <td>{build2.build.ram?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>GPU</td>
                                            <td>{build1.build.gpu?.name || "--"}</td>
                                            <td>{build2.build.gpu?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>Storage</td>
                                            <td>{build1.build.storage?.name || "--"}</td>
                                            <td>{build2.build.storage?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>Power Supply</td>
                                            <td>{build1.build.psu?.name || "--"}</td>
                                            <td>{build2.build.psu?.name || "--"}</td>
                                        </tr>
                                        <tr className="highlight-row">
                                            <td>Est. Wattage</td>
                                            <td>{calculatePower(build1.build)}W</td>
                                            <td>
                                                {calculatePower(build2.build)}W 
                                                <span className="delta">
                                                    {" "}
                                                    ({calculatePower(build2.build) >= calculatePower(build1.build) ? "+" : ""}
                                                    {calculatePower(build2.build) - calculatePower(build1.build)}W)
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="highlight-row">
                                            <td>Total Price</td>
                                            <td>${calculatePrice(build1.build).toFixed(2)}</td>
                                            <td>
                                                ${calculatePrice(build2.build).toFixed(2)} 
                                                <span className="delta">
                                                    {" "}
                                                    ({calculatePrice(build2.build) >= calculatePrice(build1.build) ? "+" : ""}
                                                    ${(calculatePrice(build2.build) - calculatePrice(build1.build)).toFixed(2)})
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
