import type { Build } from "../types/Build";
import type { BuildSave } from "../types/BuildSave";

const STORAGE_KEY = "savedBuilds";

export function getBuilds(): BuildSave[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to parse saved builds", e);
    }
    return [];
}

export function getBuild(id: string): BuildSave | undefined {
    const builds = getBuilds();
    return builds.find((b) => b.id === id);
}

export function saveBuild(build: Build): BuildSave {
    const builds = getBuilds();
    const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    
    // Update existing
    if (build.id) {
        const index = builds.findIndex((b) => b.id === build.id);
        if (index !== -1) {
            const updated: BuildSave = {
                ...builds[index],
                name: build.buildName,
                updatedAt: now,
                build: { ...build },
            };
            builds[index] = updated;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
            return updated;
        }
    }

    // Create new
    const newId = Date.now().toString();
    const newBuild: BuildSave = {
        id: newId,
        name: build.buildName,
        createdAt: now,
        updatedAt: now,
        build: { ...build, id: newId },
    };
    builds.push(newBuild);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
    return newBuild;
}

export function deleteBuild(id: string): void {
    let builds = getBuilds();
    builds = builds.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
}
