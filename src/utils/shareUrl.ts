import type { Build } from "../types/Build";
import { cpus } from "../data/cpu";
import { gpus } from "../data/gpu";
import { motherboards } from "../data/motherboards";
import { rams } from "../data/ram";
import { storages } from "../data/storage";
import { psus } from "../data/psu";
import { cpuCoolers } from "../data/cpuCooler";
import { pcCases } from "../data/pcCase";
import { caseFans } from "../data/caseFan";
import { secondaryStorages } from "../data/secondaryStorage";

interface CompactBuild {
    n: string; // name
    c?: number; // cpu id
    m?: number; // motherboard id
    g?: number; // gpu id
    r?: number; // ram id
    s?: number; // storage id
    p?: number; // psu id
    k?: number; // cooler id
    a?: number; // case id
    f?: number; // fan id
    fc?: number; // fan count
    t?: number; // storage2 id
}

export function encodeBuild(build: Build): string {
    const compact: CompactBuild = {
        n: build.buildName,
    };
    if (build.cpu) compact.c = build.cpu.id;
    if (build.motherboard) compact.m = build.motherboard.id;
    if (build.gpu) compact.g = build.gpu.id;
    if (build.ram) compact.r = build.ram.id;
    if (build.storage) compact.s = build.storage.id;
    if (build.psu) compact.p = build.psu.id;
    if (build.cooler) compact.k = build.cooler.id;
    if (build.pcCase) compact.a = build.pcCase.id;
    if (build.caseFan) {
        compact.f = build.caseFan.id;
        compact.fc = build.caseFan.count;
    }
    if (build.storage2) compact.t = build.storage2.id;

    const json = JSON.stringify(compact);
    return btoa(encodeURIComponent(json))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

/**
 * Resolve a part by id from the given catalog array.
 * If the id is present but can't be found, its string is pushed to `missing`.
 */
function resolve<T extends { id: number }>(
    catalog: T[],
    id: number | undefined,
    label: string,
    missing: string[]
): T | undefined {
    // Fix #5 — use strict undefined check instead of truthiness (handles id 0)
    if (id === undefined) return undefined;
    const found = catalog.find(p => p.id === id);
    if (!found) {
        missing.push(`${label} (id ${id})`);
    }
    return found;
}

export function decodeBuild(hash: string): Build | null {
    try {
        // Restore standard base64 from URL-safe variant
        let b64 = hash.replace(/-/g, '+').replace(/_/g, '/');
        // Re-pad if needed
        while (b64.length % 4) b64 += '=';

        const json = decodeURIComponent(atob(b64));
        const compact: CompactBuild = JSON.parse(json);

        const missing: string[] = [];

        const build: Build = {
            buildName: compact.n || "Shared Build",
        };

        build.cpu = resolve(cpus, compact.c, "CPU", missing);
        build.motherboard = resolve(motherboards, compact.m, "Motherboard", missing);
        build.gpu = resolve(gpus, compact.g, "GPU", missing);
        build.ram = resolve(rams, compact.r, "RAM", missing);
        build.storage = resolve(storages, compact.s, "Storage", missing);
        build.psu = resolve(psus, compact.p, "PSU", missing);

        const cooler = resolve(cpuCoolers, compact.k, "CPU Cooler", missing);
        if (cooler) build.cooler = cooler;

        const pcCase = resolve(pcCases, compact.a, "PC Case", missing);
        if (pcCase) build.pcCase = pcCase;

        const fan = resolve(caseFans, compact.f, "Case Fan", missing);
        if (fan) {
            build.caseFan = { ...fan, count: compact.fc ?? 1 };
        }

        const storage2 = resolve(secondaryStorages, compact.t, "Secondary Storage", missing);
        if (storage2) build.storage2 = storage2;

        if (missing.length > 0) {
            console.warn(
                "Some parts in the shared build could not be found in the current dataset:",
                missing.join(", ")
            );
        }

        return build;
    } catch (e) {
        console.error("Failed to decode build", e);
        return null;
    }
}
