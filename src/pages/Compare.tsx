import { useState, useEffect } from "react";
import { getBuilds } from "../utils/buildStorage";
import type { BuildSave } from "../types/BuildSave";
import BuilderHeader from "../components/Builder/BuilderHeader";
import { calculatePrice } from "../utils/calculatePrice";
import { calculatePower } from "../utils/calculatePower";
import { formatPrice } from "../utils/formatPrice";
import SearchableSelect from "../components/Builder/SearchableSelect";
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
                                <SearchableSelect
                                    placeholder="Search Build 1"
                                    options={builds}
                                    value={build1}
                                    onChange={(b) => setBuild1Id(b.id)}
                                />
                            </div>
                            <div className="selector-group">
                                <label>Build 2</label>
                                <SearchableSelect
                                    placeholder="Search Build 2"
                                    options={builds}
                                    value={build2}
                                    onChange={(b) => setBuild2Id(b.id)}
                                />
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
                                            <td>CPU Cooler</td>
                                            <td>{build1.build.cooler?.name || "--"}</td>
                                            <td>{build2.build.cooler?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>GPU</td>
                                            <td>{build1.build.gpu?.name || "--"}</td>
                                            <td>{build2.build.gpu?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>Memory</td>
                                            <td>{build1.build.ram?.name || "--"}</td>
                                            <td>{build2.build.ram?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>Storage</td>
                                            <td>{build1.build.storage?.name || "--"}</td>
                                            <td>{build2.build.storage?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>Secondary Storage</td>
                                            <td>{build1.build.storage2?.name || "--"}</td>
                                            <td>{build2.build.storage2?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>PC Case</td>
                                            <td>{build1.build.pcCase?.name || "--"}</td>
                                            <td>{build2.build.pcCase?.name || "--"}</td>
                                        </tr>
                                        <tr>
                                            <td>Case Fans</td>
                                            <td>{build1.build.caseFan ? `${build1.build.caseFan.count} × ${build1.build.caseFan.name}` : "--"}</td>
                                            <td>{build2.build.caseFan ? `${build2.build.caseFan.count} × ${build2.build.caseFan.name}` : "--"}</td>
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
                                            <td>{formatPrice(calculatePrice(build1.build))}</td>
                                            <td>
                                                {formatPrice(calculatePrice(build2.build))} 
                                                <span className="delta">
                                                    {" "}
                                                    ({calculatePrice(build2.build) >= calculatePrice(build1.build) ? "+" : ""}
                                                    {formatPrice(calculatePrice(build2.build) - calculatePrice(build1.build))})
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
