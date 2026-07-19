import "../styles/builder.css";
import { useEffect, useState } from "react";

import ComponentRow from "../components/Builder/ComponentRow";
import SummaryPanel from "../components/Builder/SummaryPanel";
import BuilderHeader from "../components/Builder/BuilderHeader";

import { useBuild } from "../context/BuildContext";
import { useBlocker, useSearchParams } from "react-router-dom";
import { getBuild, saveBuild } from "../utils/buildStorage";
import ConfirmModal from "../components/Common/ConfirmModal";

import { cpus } from "../data/cpu";
import { gpus } from "../data/gpu";
import { motherboards } from "../data/motherboards";
import { rams } from "../data/ram";
import { storages } from "../data/storage";
import { psus } from "../data/psu";

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
    } = useBuild();
    
    const [searchParams] = useSearchParams();
    const buildId = searchParams.get("id");
    const sharedHash = searchParams.get("build");
    
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) => {
            return isDirty && (currentLocation.pathname !== nextLocation.pathname || currentLocation.search !== nextLocation.search);
        }
    );

    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingBlocker, setPendingBlocker] = useState<any>(null);

    useEffect(() => {
        if (blocker.state === "blocked") {
            setPendingBlocker(blocker);
            setShowConfirm(true);
        }
    }, [blocker.state]);
    const [modalWarning, setModalWarning] = useState("");

    const handleSaveAndReturn = () => {
        if (!build.buildName || build.buildName.trim() === "") {
            setModalWarning("Please enter a build name before saving.");
            return;
        }
        const saved = saveBuild(build);
        if (!saved) {
            setModalWarning("Failed to save — storage may be full.");
            return;
        }
        if (!build.id) {
            setBuild(prev => ({ ...prev, id: saved.id }));
            setCurrentBuildId(saved.id);
        }
        setSavedSnapshot(saved.build);
        setModalWarning("");
        pendingBlocker?.proceed();
        setShowConfirm(false);
    };

    const handleReturnWithoutSaving = () => {
        resetBuild();
        setModalWarning("");
        pendingBlocker?.proceed();
        setShowConfirm(false);
    };

    const handleStay = () => {
        setModalWarning("");
        pendingBlocker?.reset();
        setShowConfirm(false);
    };

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    useEffect(() => {
        if (sharedHash) {
            import("../utils/shareUrl").then(({ decodeBuild }) => {
                const decoded = decodeBuild(sharedHash);
                if (decoded) {
                    setBuild(decoded);
                    setIsShared(true);
                }
            });
        } else if (buildId) {
            if (buildId !== currentBuildId) {
                const saved = getBuild(buildId);
                if (saved) {
                    loadSnapshot(saved);
                }
            }
        }
        // Only reset when switching from a build URL to no build URL
        // (i.e., explicitly navigated to /builder without an id)
    }, [buildId, sharedHash]);

    useEffect(() => {
        document.title = "Builder — PC Part Checker";
    }, []);
    useEffect(() => {

        if (
            build.cpu &&
            build.motherboard &&
            build.cpu.socket !== build.motherboard.socket
        ) {

            setBuild(previous => ({
                ...previous,
                motherboard: undefined,
                ram: undefined,
            }));

        }

}, [build.cpu, build.motherboard, setBuild]);
    const filteredMotherboards = build.cpu
    ? motherboards.filter(
          board => board.socket === build.cpu!.socket
      )
    : motherboards;

    const filteredRam = build.motherboard
    ? rams.filter(
          ram => ram.type === build.motherboard!.ramType
      )
    : rams;

    const requiredPower =
    (build.cpu?.tdp ?? 0) +
    (build.gpu?.power ?? 0);

const filteredPsus = psus.filter(
    psu => psu.wattage >= requiredPower + 150
);
    
    return (

        <main className="builder-page">



            <div className="builder-container">

                <div className="builder-left">

                    <BuilderHeader />

                    <div className="builder-title">
                        
                        <span>BUILD EDITOR</span>

                        <h1>Create Build</h1>

                        <p>
                            Select each component below to assemble your PC.
                        </p>

                    </div>

                    <ComponentRow
                        label="CPU"
                        placeholder="Search CPU"
                        options={cpus}
                        value={build.cpu}
                        disabled={isShared}
                        onChange={(cpu) =>
                            setBuild(previous => ({
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
                            setBuild(previous => ({
                                ...previous,
                                motherboard,
                            }))
                        }
                    />
                    <ComponentRow
                        label="GPU"
                        placeholder="Search GPU"
                        options={gpus}
                        value={build.gpu}
                        disabled={isShared}
                        onChange={(gpu)=>
                            setBuild(previous=>({
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
                            setBuild(previous => ({
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
                        onChange={(storage)=>
                            setBuild(previous=>({
                                ...previous,
                                storage,
                            }))
                        }
                    />

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
                            setBuild(previous => ({
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

    );

}