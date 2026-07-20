import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBuilds, deleteBuild, saveBuild } from "../utils/buildStorage";
import type { BuildSave } from "../types/BuildSave";

import BuilderHeader from "../components/Builder/BuilderHeader";
import TerminalButton from "../components/Common/TerminalButton";
import ConfirmModal from "../components/Common/ConfirmModal";
import { useBuild } from "../context/BuildContext";
import "../styles/builds.css";

export default function Builds() {
    const navigate = useNavigate();
    const [builds, setBuilds] = useState<BuildSave[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [expandedPartsId, setExpandedPartsId] = useState<string | null>(null);

    const { build, isDirty, resetBuild } = useBuild();
    const [showModal, setShowModal] = useState(false);
    const [modalWarning, setModalWarning] = useState("");
    const [pendingOpenId, setPendingOpenId] = useState<string | null>(null);

    useEffect(() => {
        setBuilds(getBuilds());
    }, []);

    useEffect(() => {
        document.title = "My Builds — PC Part Checker";
    }, []);

    const handleOpen = (id: string) => {
        if (isDirty) {
            setPendingOpenId(id);
            setShowModal(true);
        } else {
            navigate(`/builder?id=${id}`);
        }
    };

    const handleSaveAndOpen = () => {
        if (!build.buildName || build.buildName.trim() === "") {
            setModalWarning("Please enter a build name before saving.");
            return;
        }
        saveBuild(build);
        setModalWarning("");
        setShowModal(false);
        if (pendingOpenId) navigate(`/builder?id=${pendingOpenId}`);
    };

    const handleDiscardAndOpen = () => {
        setModalWarning("");
        resetBuild();
        setShowModal(false);
        if (pendingOpenId) navigate(`/builder?id=${pendingOpenId}`);
    };

    const handleCancel = () => {
        setModalWarning("");
        setShowModal(false);
        setPendingOpenId(null);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this build?")) {
            deleteBuild(id);
            setBuilds(getBuilds());
        }
    };

    const handleDuplicate = (buildSave: BuildSave) => {
        const duplicatedBuild = {
            ...buildSave.build,
            buildName: `${buildSave.build.buildName} (Copy)`,
            id: undefined // Force a new ID to be generated
        };
        saveBuild(duplicatedBuild);
        setBuilds(getBuilds());
    };

    const startEditing = (buildSave: BuildSave) => {
        setEditingId(buildSave.id);
        setEditName(buildSave.name);
    };

    const saveEditName = (buildSave: BuildSave) => {
        if (editName.trim() && editName !== buildSave.name) {
            const updatedBuild = { ...buildSave.build, buildName: editName.trim(), id: buildSave.id };
            saveBuild(updatedBuild);
            setBuilds(getBuilds());
        }
        setEditingId(null);
    };

    const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                if (json.buildName) {
                    const newBuild = { ...json, id: undefined, buildName: json.buildName + " (Imported)" };
                    saveBuild(newBuild);
                    setBuilds(getBuilds());
                    alert("Build imported successfully!");
                } else {
                    alert("Invalid build JSON file.");
                }
            } catch {
                alert("Failed to parse JSON.");
            }
        };
        reader.readAsText(file);
        e.target.value = ''; // reset input
    };

    return (
        <main className="builds-page">

            
            <div className="builds-container">
                
                <BuilderHeader />
                
                <div className="builds-title" style={{ marginTop: "40px" }}>
                    <span>SAVED BUILDS</span>
                    <h1>Browse Builds</h1>
                    <p>Manage, duplicate, or delete your previously saved configurations.</p>
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                    <label className="build-action-button" style={{ cursor: 'pointer' }}>
                        import json
                        <input 
                            type="file" 
                            accept=".json" 
                            style={{ display: 'none' }} 
                            onChange={handleImportJson} 
                        />
                    </label>
                </div>

                {builds.length === 0 ? (
                    <div className="empty-builds">
                        <p>No builds saved yet.</p>
                        <TerminalButton
                            onClick={() => navigate("/builder")} 
                            loadingText="entering builder..."
                        >
                            create your first build
                        </TerminalButton>
                    </div>
                ) : (
                    <div className="builds-list">
                        {builds.map((buildSave) => {

                            const isEditing = editingId === buildSave.id;

                            return (
                                <div key={buildSave.id} className="build-card">
                                    <div className="build-card-header">
                                        <div className="build-name-display">
                                            {isEditing ? (
                                                <input 
                                                    className="build-name-input"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") saveEditName(buildSave);
                                                        if (e.key === "Escape") setEditingId(null);
                                                    }}
                                                    onBlur={() => saveEditName(buildSave)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <h3>{buildSave.name}</h3>
                                            )}
                                            <span>Last Edited {buildSave.updatedAt}</span>
                                        </div>
                                    </div>

                                    <div className="expandable-item" style={{ margin: "16px 0" }}>
                                        <div className="summary-item">
                                            <span className="boldspan">Selected Parts</span>
                                            <span>{[
                                                buildSave.build.cpu, buildSave.build.motherboard, 
                                                buildSave.build.cooler, buildSave.build.gpu, buildSave.build.ram, 
                                                buildSave.build.storage, buildSave.build.storage2,
                                                buildSave.build.pcCase, buildSave.build.caseFan,
                                                buildSave.build.psu
                                            ].filter(Boolean).length} / 10</span>
                                        </div>
                                        <div 
                                            className="spec-toggle" 
                                            onClick={() => setExpandedPartsId(expandedPartsId === buildSave.id ? null : buildSave.id)}
                                        >
                                            {expandedPartsId === buildSave.id ? "▼ Hide Parts" : "► View Parts"}
                                        </div>
                                        {expandedPartsId === buildSave.id && (
                                            <div className="spec-list">
                                                <div className="spec-row">
                                                    <span>CPU</span>
                                                    <span>{buildSave.build.cpu?.name ?? "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>Motherboard</span>
                                                    <span>{buildSave.build.motherboard?.name ?? "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>CPU Cooler</span>
                                                    <span>{buildSave.build.cooler?.name ?? "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>GPU</span>
                                                    <span>{buildSave.build.gpu?.name ?? "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>Memory</span>
                                                    <span>{buildSave.build.ram?.name ?? "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>Storage</span>
                                                    <span>{buildSave.build.storage?.name ?? "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>Secondary Storage</span>
                                                    <span>{buildSave.build.storage2?.name ?? "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>PC Case</span>
                                                    <span>{buildSave.build.pcCase?.name ?? "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>Case Fans</span>
                                                    <span>{buildSave.build.caseFan ? `${buildSave.build.caseFan.count} × ${buildSave.build.caseFan.name}` : "--"}</span>
                                                </div>
                                                <div className="spec-row">
                                                    <span>Power Supply</span>
                                                    <span>{buildSave.build.psu?.name ?? "--"}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="build-actions-row">
                                        <button className="build-action-button" onClick={() => handleOpen(buildSave.id)}>
                                            open
                                        </button>
                                        <button className="build-action-button" onClick={() => {
                                            import("../utils/shareUrl").then(({ encodeBuild }) => {
                                                const hash = encodeBuild(buildSave.build);
                                                const url = `${window.location.origin}/builder?build=${encodeURIComponent(hash)}`;
                                                navigator.clipboard.writeText(url).then(() => {
                                                    alert("Share link copied!");
                                                });
                                            });
                                        }}>
                                            share
                                        </button>
                                        <button className="build-action-button" onClick={() => startEditing(buildSave)}>
                                            rename
                                        </button>
                                        <button className="build-action-button" onClick={() => handleDuplicate(buildSave)}>
                                            duplicate
                                        </button>
                                        <button className="build-action-button" onClick={() => handleDelete(buildSave.id)}>
                                            delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            <ConfirmModal
                open={showModal}
                title="OPEN BUILD"
                message="Current build has unsaved changes."
                warning={modalWarning}
                btnSaveLabel="save & open"
                btnDiscardLabel="discard & open"
                btnCancelLabel="cancel"
                onSave={handleSaveAndOpen}
                onDiscard={handleDiscardAndOpen}
                onCancel={handleCancel}
            />
        </main>
    );
}
