import type { CPU } from "../data/cpu";
import type { GPU } from "../data/gpu";
import type { Motherboard } from "../data/motherboards";
import type { RAM } from "../data/ram";
import type { PSU } from "../data/psu";
import type { Storage } from "../data/storage";

export interface Build {

    buildName: string;

    id?: string;

    cpu?: CPU;

    motherboard?: Motherboard;

    gpu?: GPU;

    ram?: RAM;

    storage?: Storage;

    psu?: PSU;

}