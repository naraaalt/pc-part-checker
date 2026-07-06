import type { Build } from "../types/Build";

export function calculatePower(build: Build) {

    let total = 0;

    if (build.cpu)
        total += build.cpu.tdp;

    if (build.gpu)
        total += build.gpu.power;

    return total;

}