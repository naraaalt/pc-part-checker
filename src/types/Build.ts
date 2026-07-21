import type { CPU } from "../data/cpu"
import type { GPU } from "../data/gpu"
import type { Motherboard } from "../data/motherboards"
import type { RAM } from "../data/ram"
import type { PSU } from "../data/psu"
import type { Storage } from "../data/storage"
import type { CpuCooler } from "../data/cpuCooler"
import type { PcCase } from "../data/pcCase"
import type { CaseFan } from "../data/caseFan"

export interface Build {
  buildName: string

  id?: string

  cpu?: CPU

  motherboard?: Motherboard

  cooler?: CpuCooler

  gpu?: GPU

  ram?: RAM

  storage?: Storage

  storage2?: Storage

  pcCase?: PcCase

  caseFan?: CaseFan & { count: number }

  psu?: PSU
}

/** Canonical list of the ten part-slot keys on a Build. */
export const PART_KEYS = [
  "cpu",
  "motherboard",
  "cooler",
  "gpu",
  "ram",
  "storage",
  "storage2",
  "pcCase",
  "caseFan",
  "psu",
] as const

/** Union type of part-slot key names. */
export type PartKey = (typeof PART_KEYS)[number]
