import type { Build } from "../types/Build";
import { cpus } from "../data/cpu";
import { gpus } from "../data/gpu";
import { motherboards } from "../data/motherboards";
import { rams } from "../data/ram";
import { storages } from "../data/storage";
import { psus } from "../data/psu";

interface CompactBuild {
    n: string; // name
    c?: number; // cpu id
    m?: number; // motherboard id
    g?: number; // gpu id
    r?: number; // ram id
    s?: number; // storage id
    p?: number; // psu id
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

    const json = JSON.stringify(compact);
    return btoa(encodeURIComponent(json))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export function decodeBuild(hash: string): Build | null {
    try {
        // Restore standard base64 from URL-safe variant
        let b64 = hash.replace(/-/g, '+').replace(/_/g, '/');
        // Re-pad if needed
        while (b64.length % 4) b64 += '=';

        const json = decodeURIComponent(atob(b64));
        const compact: CompactBuild = JSON.parse(json);

        const build: Build = {
            buildName: compact.n || "Shared Build",
        };

        if (compact.c) build.cpu = cpus.find(p => p.id === compact.c);
        if (compact.m) build.motherboard = motherboards.find(p => p.id === compact.m);
        if (compact.g) build.gpu = gpus.find(p => p.id === compact.g);
        if (compact.r) build.ram = rams.find(p => p.id === compact.r);
        if (compact.s) build.storage = storages.find(p => p.id === compact.s);
        if (compact.p) build.psu = psus.find(p => p.id === compact.p);

        return build;
    } catch (e) {
        console.error("Failed to decode build", e);
        return null;
    }
}

