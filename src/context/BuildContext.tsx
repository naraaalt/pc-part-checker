import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { Build } from "../types/Build";

export const defaultBuild: Build = {

    buildName: "",

};

interface BuildContextType {
    build: Build;
    setBuild: React.Dispatch<React.SetStateAction<Build>>;
    savedSnapshot: Build | null;
    setSavedSnapshot: React.Dispatch<React.SetStateAction<Build | null>>;
    currentBuildId: string | null;
    setCurrentBuildId: React.Dispatch<React.SetStateAction<string | null>>;
    isDirty: boolean;
    resetBuild: () => void;
    loadSnapshot: (buildSave: import("../types/BuildSave").BuildSave) => void;
}

const BuildContext = createContext<BuildContextType | null>(null);

export function BuildProvider({ children }: { children: ReactNode }) {
    const [build, setBuild] = useState<Build>(defaultBuild);
    const [savedSnapshot, setSavedSnapshot] = useState<Build | null>(null);
    const [currentBuildId, setCurrentBuildId] = useState<string | null>(null);

    const isDirty = JSON.stringify(build) !== JSON.stringify(savedSnapshot || defaultBuild);

    function resetBuild() {
        setBuild({ ...defaultBuild });
        setSavedSnapshot(null);
        setCurrentBuildId(null);
    }

    function loadSnapshot(buildSave: import("../types/BuildSave").BuildSave) {
        setBuild({ ...buildSave.build });
        setSavedSnapshot({ ...buildSave.build });
        setCurrentBuildId(buildSave.id);
    }

    return (
        <BuildContext.Provider
            value={{
                build,
                setBuild,
                savedSnapshot,
                setSavedSnapshot,
                currentBuildId,
                setCurrentBuildId,
                isDirty,
                resetBuild,
                loadSnapshot
            }}
        >
            {children}
        </BuildContext.Provider>
    );
}

export function useBuild() {

    const context = useContext(BuildContext);

    if (!context) {

        throw new Error("useBuild must be used inside BuildProvider");

    }

    return context;

}