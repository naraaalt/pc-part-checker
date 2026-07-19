import { useBuild } from "../../context/BuildContext";
import { useState } from "react";
import { saveBuild } from "../../utils/buildStorage";

export default function BuildActions() {

    const [status, setStatus] = useState("");
    const { build, setBuild, setSavedSnapshot, setCurrentBuildId, resetBuild } = useBuild();
    const [, setActionState] = useState({

        save: "idle",

        export: "idle",

        clear: "idle",

    });

    async function animateAction(

        action: "save" | "export" | "clear",

        callback: () => void,

    ) {

        setActionState(previous => ({

            ...previous,

            [action]: "loading",

        }));

        await new Promise(resolve =>

            setTimeout(resolve, 500)

        );

        callback();

        setActionState(previous => ({

            ...previous,

            [action]: "done",

        }));

        await new Promise(resolve =>

            setTimeout(resolve, 1000)

        );

        setActionState(previous => ({

            ...previous,

            [action]: "idle",

        }));

    }

    function handleSave() {

        if (!build.buildName || build.buildName.trim() === "") {
            setStatus("Please enter a build name before saving.");
            setTimeout(() => setStatus(""), 2500);
            return;
        }

        if (!build.cpu && !build.gpu && !build.motherboard && !build.ram && !build.storage && !build.psu) {
            setStatus("Please pick a part first.");
            setTimeout(() => setStatus(""), 2500);
            return;
        }

        const saved = saveBuild(build);
        
        if (!saved) {
            setStatus("Failed to save — storage may be full.");
            setTimeout(() => setStatus(""), 2500);
            return;
        }

        if (!build.id) {
            setBuild(prev => ({ ...prev, id: saved.id }));
            setCurrentBuildId(saved.id);
        }
        
        setSavedSnapshot(saved.build);

        setStatus("Build saved successfully.");

        setTimeout(() => {
            setStatus("");
        }, 2500);

    }

    function handleClear() {
        resetBuild();

        setStatus("Build cleared.");

        setTimeout(() => {

            setStatus("");

        }, 2500);

    }

    function handleExport() {

        if (!build.buildName || build.buildName.trim() === "") {
            setStatus("Please enter a build name before exporting.");
            setTimeout(() => setStatus(""), 2500);
            return;
        }

        if (!build.cpu && !build.gpu && !build.motherboard && !build.ram && !build.storage && !build.psu) {

            setStatus("Please pick a part first.");

            setTimeout(() => setStatus(""), 2500);

            return;

        }

        animateAction("export", () => {

            const json = JSON.stringify(

                build,

                null,

                2

            );

            const blob = new Blob([
                json
            ], {
                type: "application/json",
            });

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = `${build.buildName}.json`;

            link.click();

            URL.revokeObjectURL(url);

            setStatus("Build exported as JSON.");

            setTimeout(() => {

                setStatus("");

            }, 2500);
        });
    }

    function handleSaveToMyBuilds() {
        if (!build.cpu && !build.gpu && !build.motherboard && !build.ram && !build.storage && !build.psu) {
            setStatus("Please pick a part first.");
            setTimeout(() => setStatus(""), 2500);
            return;
        }

        const buildCopy = { ...build, id: undefined, buildName: build.buildName + " (Shared)" };
        const saved = saveBuild(buildCopy);
        
        if (!saved) {
            setStatus("Failed to save — storage may be full.");
            setTimeout(() => setStatus(""), 2500);
            return;
        }

        setBuild(prev => ({ ...prev, id: saved.id, buildName: saved.name }));
        setCurrentBuildId(saved.id);
        setSavedSnapshot(saved.build);
        setIsShared(false); // No longer shared, now owned

        setStatus("Saved to my builds.");
        setTimeout(() => setStatus(""), 2500);
    }

    function handleShare() {
        if (!build.cpu && !build.gpu && !build.motherboard && !build.ram && !build.storage && !build.psu) {
            setStatus("Please pick a part first.");
            setTimeout(() => setStatus(""), 2500);
            return;
        }

        import("../../utils/shareUrl").then(({ encodeBuild }) => {
            const hash = encodeBuild(build);
            const url = `${window.location.origin}/builder?build=${encodeURIComponent(hash)}`;
            navigator.clipboard.writeText(url)
                .then(() => {
                    setStatus("Share link copied!");
                    setTimeout(() => setStatus(""), 2500);
                })
                .catch(() => {
                    setStatus("Copy failed — copy the link manually.");
                    setTimeout(() => setStatus(""), 4000);
                });
        }).catch(() => {
            setStatus("Failed to generate share link.");
            setTimeout(() => setStatus(""), 2500);
        });
    }

    const { isShared, setIsShared } = useBuild();

    return (

        <div className="build-actions">

            {status && <span className="build-status">{status}</span>}

            {isShared ? (
                <button
                    className="build-action-button"
                    onClick={handleSaveToMyBuilds}
                >
                    save to my builds
                </button>
            ) : (
                <button
                    className="build-action-button"
                    onClick={handleSave}
                >
                    save build
                </button>
            )}

            <button
                className="build-action-button"
                onClick={handleShare}
            >
                copy share link
            </button>

            <button
                className="build-action-button"
                onClick={handleExport}
            >

                export json

            </button>

            {!isShared && (
                <button
                    className="build-action-button"
                    onClick={handleClear}
                >

                    clear build

                </button>
            )}

        </div>

    );
}