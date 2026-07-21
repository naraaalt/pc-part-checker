import type { Build } from "../types/Build"
import type { CompatibilityResult, Diagnostic } from "../types/Compatibility"
import { calculatePower } from "./calculatePower"

export function checkCompatibility(build: Build): CompatibilityResult {
  const diagnostics: Diagnostic[] = []

  // CPU Socket
  if (build.cpu && build.motherboard) {
    if (build.cpu.socket === build.motherboard.socket) {
      diagnostics.push({
        name: "CPU Socket",

        status: "pass",

        message: "Socket matches.",
      })
    } else {
      diagnostics.push({
        name: "CPU Socket",

        status: "fail",

        message: "CPU socket does not match motherboard.",
      })
    }
  }

  // RAM Type
  if (build.ram && build.motherboard) {
    if (build.ram.type === build.motherboard.ramType) {
      diagnostics.push({
        name: "Memory Type",

        status: "pass",

        message: "Memory type supported.",
      })
    } else {
      diagnostics.push({
        name: "Memory Type",

        status: "fail",

        message: "Incorrect RAM type.",
      })
    }

    // Fix #4 — RAM capacity vs motherboard maxMemory
    if (build.ram.capacity > build.motherboard.maxMemory) {
      diagnostics.push({
        name: "Memory Capacity",

        status: "fail",

        message: `RAM capacity (${build.ram.capacity} GB) exceeds motherboard maximum (${build.motherboard.maxMemory} GB).`,
      })
    }
  }

  // PSU — Fix #3: use shared calculatePower so verdict matches displayed wattage
  if (build.psu) {
    const required = calculatePower(build)

    if (build.psu.wattage >= required + 100) {
      diagnostics.push({
        name: "Power",

        status: "pass",

        message: "PSU capacity sufficient.",
      })
    } else if (build.psu.wattage >= required) {
      diagnostics.push({
        name: "Power",

        status: "warning",

        message: "PSU headroom is tight.",
      })
    } else {
      diagnostics.push({
        name: "Power",

        status: "fail",

        message: "PSU wattage too low.",
      })
    }
  }

  // 1. Cooler Socket Compatibility
  if (build.cooler && build.cpu) {
    if (build.cooler.sockets.includes(build.cpu.socket)) {
      diagnostics.push({
        name: "Cooler Socket",
        status: "pass",
        message: "Cooler supports CPU socket.",
      })
    } else {
      diagnostics.push({
        name: "Cooler Socket",
        status: "fail",
        message: `Cooler socket does not support CPU socket (${build.cpu.socket}).`,
      })
    }
  }

  // 2. Cooler Capacity Compatibility
  if (build.cooler && build.cpu) {
    if (build.cooler.tdpRating >= build.cpu.tdp) {
      diagnostics.push({
        name: "Cooler Capacity",
        status: "pass",
        message: "Cooler thermal capacity is sufficient.",
      })
    } else {
      diagnostics.push({
        name: "Cooler Capacity",
        status: "warning",
        message: `Cooler TDP rating (${build.cooler.tdpRating}W) is below CPU TDP (${build.cpu.tdp}W).`,
      })
    }
  }

  // 3. Case Motherboard Form Factor Compatibility
  if (build.pcCase && build.motherboard) {
    if (
      build.pcCase.supportedFormFactors.includes(build.motherboard.formFactor)
    ) {
      diagnostics.push({
        name: "Case Form Factor",
        status: "pass",
        message: "Case supports motherboard form factor.",
      })
    } else {
      diagnostics.push({
        name: "Case Form Factor",
        status: "fail",
        message: `Case does not support motherboard form factor (${build.motherboard.formFactor}).`,
      })
    }
  }

  // 4. Case GPU Length Clearance
  if (build.pcCase && build.gpu) {
    if (build.gpu.length <= build.pcCase.maxGpuLength) {
      diagnostics.push({
        name: "Case GPU Clearance",
        status: "pass",
        message: "GPU length fits within case.",
      })
    } else {
      diagnostics.push({
        name: "Case GPU Clearance",
        status: "fail",
        message: `GPU length (${build.gpu.length}mm) exceeds case maximum (${build.pcCase.maxGpuLength}mm).`,
      })
    }
  }

  // 5. Case Cooler Clearance
  if (build.pcCase && build.cooler) {
    if (build.cooler.type === "Air" && build.cooler.height) {
      if (build.cooler.height <= build.pcCase.maxCoolerHeight) {
        diagnostics.push({
          name: "Case Cooler Clearance",
          status: "pass",
          message: "Cooler height fits within case.",
        })
      } else {
        diagnostics.push({
          name: "Case Cooler Clearance",
          status: "fail",
          message: `Cooler height (${build.cooler.height}mm) exceeds case maximum (${build.pcCase.maxCoolerHeight}mm).`,
        })
      }
    }
  }

  // 6. Case Fan Size Compatibility
  if (build.pcCase && build.caseFan) {
    if (build.pcCase.fanSizes.includes(build.caseFan.size)) {
      diagnostics.push({
        name: "Case Fan Size",
        status: "pass",
        message: "Fan size supported by case.",
      })
    } else {
      diagnostics.push({
        name: "Case Fan Size",
        status: "fail",
        message: `Case does not support ${build.caseFan.size}mm fans.`,
      })
    }
  }

  // 7. Case Fan Count Compatibility
  if (build.pcCase && build.caseFan) {
    if (build.caseFan.count <= build.pcCase.maxCaseFans) {
      diagnostics.push({
        name: "Case Fan Count",
        status: "pass",
        message: "Fan count within case limit.",
      })
    } else {
      diagnostics.push({
        name: "Case Fan Count",
        status: "fail",
        message: `Fan count (${build.caseFan.count}) exceeds case maximum (${build.pcCase.maxCaseFans}).`,
      })
    }
  }

  // 8. Storage Slots Compatibility
  if (build.motherboard && (build.storage || build.storage2)) {
    let usedM2 = 0
    let usedSata = 0
    if (build.storage) {
      if (build.storage.type === "NVMe") usedM2++
      else if (build.storage.type === "SATA SSD") usedSata++
    }
    if (build.storage2) {
      if (build.storage2.type === "NVMe") usedM2++
      else if (build.storage2.type === "SATA SSD") usedSata++
    }

    if (
      usedM2 <= build.motherboard.m2Slots &&
      usedSata <= build.motherboard.sataPorts
    ) {
      diagnostics.push({
        name: "Storage Slots",
        status: "pass",
        message: "Motherboard has sufficient storage slots.",
      })
    } else {
      diagnostics.push({
        name: "Storage Slots",
        status: "fail",
        message: `Required slots exceed motherboard capacity. Used M.2: ${usedM2}/${build.motherboard.m2Slots}, SATA: ${usedSata}/${build.motherboard.sataPorts}.`,
      })
    }
  }

  return {
    compatible: diagnostics.every((d) => d.status !== "fail"),

    diagnostics,
  }
}
