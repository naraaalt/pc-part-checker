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

    // Secondary Storage: ~6 W per drive
    if (build.storage2)
        total += 6;

    // CPU Cooler: ~5 W for pump/fans
    if (build.cooler)
        total += 5;

    // Case Fans: ~2 W per fan
    if (build.caseFan)
        total += build.caseFan.count * 2;

    // USB, VRM and general motherboard overhead (lowered from 50W to 30W now that cooler and fans are explicit)
    total += 30;

    return total;

}