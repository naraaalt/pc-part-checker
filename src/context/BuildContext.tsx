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

    resetBuild: () => void;

}

const BuildContext = createContext<BuildContextType | null>(null);

export function BuildProvider({

    children,

}: {

    children: ReactNode;

}) {

    const [build, setBuild] = useState<Build>(defaultBuild);

    function resetBuild() {

        setBuild({ ...defaultBuild });

    }

    return (

        <BuildContext.Provider
            value={{
                build,
                setBuild,
                resetBuild,
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