import type { Build } from "../types/Build";
import type { CompatibilityResult, Diagnostic,} from "../types/Compatibility";
import { calculatePower } from "./calculatePower";

export function checkCompatibility(
    build: Build
): CompatibilityResult {

    const diagnostics: Diagnostic[] = [];

    // CPU Socket
    if (build.cpu && build.motherboard) {

        if (build.cpu.socket === build.motherboard.socket) {

            diagnostics.push({

                name: "CPU Socket",

                status: "pass",

                message: "Socket matches."

            });

        } else {

            diagnostics.push({

                name: "CPU Socket",

                status: "fail",

                message: "CPU socket does not match motherboard."

            });

        }

    }

    // RAM Type
    if (build.ram && build.motherboard) {

        if (build.ram.type === build.motherboard.ramType) {

            diagnostics.push({

                name: "Memory Type",

                status: "pass",

                message: "Memory type supported."

            });

        } else {

            diagnostics.push({

                name: "Memory Type",

                status: "fail",

                message: "Incorrect RAM type."

            });

        }

        // Fix #4 — RAM capacity vs motherboard maxMemory
        if (build.ram.capacity > build.motherboard.maxMemory) {

            diagnostics.push({

                name: "Memory Capacity",

                status: "fail",

                message: `RAM capacity (${build.ram.capacity} GB) exceeds motherboard maximum (${build.motherboard.maxMemory} GB).`

            });

        }

    }

    // PSU — Fix #3: use shared calculatePower so verdict matches displayed wattage
    if (build.psu) {

        const required = calculatePower(build);

        if (build.psu.wattage >= required + 100) {

            diagnostics.push({

                name: "Power",

                status: "pass",

                message: "PSU capacity sufficient."

            });

        } else if (build.psu.wattage >= required) {
            
            diagnostics.push({
                
                name: "Power",
                
                status: "warning",
                
                message: "PSU headroom is tight."
                
            });

        } else {

            diagnostics.push({

                name: "Power",

                status: "fail",

                message: "PSU wattage too low."

            });

        }

    }

    return {

        compatible: diagnostics.every(
            d => d.status !== "fail"
        ),

        diagnostics,

    };

}