import type { Build } from "../types/Build";

/**
 * Estimate total system power draw in watts.
 * Includes CPU, GPU, motherboard, RAM, storage, and a fixed overhead
 * for fans / peripherals / VRMs.
 */
export function calculatePower(build: Build): number {

    let total = 0;

    if (build.cpu)
        total += build.cpu.tdp;

    if (build.gpu)
        total += build.gpu.power;

    // Motherboard: ~50 W typical draw
    if (build.motherboard)
        total += 50;

    // RAM: ~4 W for ≤16 GB, ~8 W for larger kits
    if (build.ram)
        total += build.ram.capacity > 16 ? 8 : 4;

    // Storage: ~6 W per drive (NVMe or SATA SSD)
    if (build.storage)
        total += 6;

    // Fans, USB, VRM overhead
    total += 50;

    return total;

}