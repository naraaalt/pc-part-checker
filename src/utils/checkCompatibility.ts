import type { Build } from "../types/Build";
import type { CompatibilityResult, Diagnostic,} from "../types/Compatibility";

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

                name: "Memory",

                status: "pass",

                message: "Memory type supported."

            });

        } else {

            diagnostics.push({

                name: "Memory",

                status: "fail",

                message: "Incorrect RAM type."

            });

        }

    }

    // PSU
    if (build.psu) {

        const required =
            (build.cpu?.tdp ?? 0) +
            (build.gpu?.power ?? 0);

        if (build.psu.wattage >= required + 150) {

            diagnostics.push({

                name: "Power",

                status: "pass",

                message: "PSU capacity sufficient."

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