import { useBuild } from "../../context/BuildContext";
import { useState } from "react";
export default function BuildActions() {

    const [status, setStatus] = useState("");
    const { build, setBuild } = useBuild();
    const [actionState, setActionState] = useState({

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

        localStorage.setItem(
            "savedBuild",
            JSON.stringify(build)
        );

        setStatus("Build saved successfully.");

        setTimeout(() => {
            setStatus("");
        }, 2500);

    }

    function handleClear() {

        setBuild({

            buildName: "",

        });

        localStorage.removeItem("savedBuild");

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

    return (

        <div className="build-actions">

            {status}

            <button
                className="build-action-button"
                onClick={handleSave}
            >

                save build

            </button>

            <button
                className="build-action-button"
                onClick={handleExport}
            >

                export json

            </button>

            <button
                className="build-action-button"
                onClick={handleClear}
            >

                clear build

            </button>

        </div>

    );

}