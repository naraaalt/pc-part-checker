export interface PcCase {
    id: number;
    brand: "NZXT" | "Fractal" | "Lian Li" | "Corsair" | "Phanteks" | "Cooler Master" | "be quiet!" | "Thermaltake";
    name: string;
    supportedFormFactors: ("ATX" | "Micro-ATX" | "Mini-ITX")[];
    maxGpuLength: number;     // mm
    maxCoolerHeight: number;  // mm
    supportedPsuFormFactors: ("ATX" | "SFX")[];
    maxCaseFans: number;
    fanSizes: (120 | 140)[];
    price: number;
}

export const pcCases: PcCase[] = [
    {
        id: 1,
        brand: "NZXT",
        name: "NZXT H5 Flow (2024)",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 365,
        maxCoolerHeight: 165,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 6,
        fanSizes: [120, 140],
        price: 94
    },
    {
        id: 2,
        brand: "Fractal",
        name: "Fractal Design North",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 355,
        maxCoolerHeight: 170,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 6,
        fanSizes: [120, 140],
        price: 139
    },
    {
        id: 3,
        brand: "Lian Li",
        name: "Lian Li O11 Dynamic EVO",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 426,
        maxCoolerHeight: 167,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 10,
        fanSizes: [120, 140],
        price: 169
    },
    {
        id: 4,
        brand: "Corsair",
        name: "Corsair 4000D Airflow",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 360,
        maxCoolerHeight: 170,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 6,
        fanSizes: [120, 140],
        price: 89
    },
    {
        id: 5,
        brand: "Phanteks",
        name: "Phanteks NV5",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 440,
        maxCoolerHeight: 180,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 8,
        fanSizes: [120],
        price: 99
    },
    {
        id: 6,
        brand: "NZXT",
        name: "NZXT H9 Flow",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 435,
        maxCoolerHeight: 165,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 10,
        fanSizes: [120],
        price: 159
    },
    {
        id: 7,
        brand: "Fractal",
        name: "Fractal Design Terra",
        supportedFormFactors: ["Mini-ITX"],
        maxGpuLength: 322,
        maxCoolerHeight: 77,
        supportedPsuFormFactors: ["SFX"],
        maxCaseFans: 1,
        fanSizes: [120],
        price: 179
    },
    {
        id: 8,
        brand: "Lian Li",
        name: "Lian Li A4-H2O",
        supportedFormFactors: ["Mini-ITX"],
        maxGpuLength: 322,
        maxCoolerHeight: 55,
        supportedPsuFormFactors: ["SFX"],
        maxCaseFans: 2,
        fanSizes: [120],
        price: 119
    },
    {
        id: 9,
        brand: "Corsair",
        name: "Corsair 2000D Airflow",
        supportedFormFactors: ["Mini-ITX"],
        maxGpuLength: 365,
        maxCoolerHeight: 90,
        supportedPsuFormFactors: ["SFX"],
        maxCaseFans: 6,
        fanSizes: [120],
        price: 139
    },
    {
        id: 10,
        brand: "Thermaltake",
        name: "Thermaltake Tower 300",
        supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
        maxGpuLength: 400,
        maxCoolerHeight: 210,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 8,
        fanSizes: [120, 140],
        price: 149
    },
    {
        id: 11,
        brand: "be quiet!",
        name: "be quiet! Shadow Base 800 DX",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 430,
        maxCoolerHeight: 180,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 8,
        fanSizes: [120, 140],
        price: 169
    },
    {
        id: 12,
        brand: "Cooler Master",
        name: "Cooler Master MasterBox Q300L",
        supportedFormFactors: ["Micro-ATX", "Mini-ITX"],
        maxGpuLength: 360,
        maxCoolerHeight: 159,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 5,
        fanSizes: [120],
        price: 39
    },
    {
        id: 13,
        brand: "NZXT",
        name: "NZXT H7 Flow (2024)",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 400,
        maxCoolerHeight: 185,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 7,
        fanSizes: [120, 140],
        price: 129
    },
    {
        id: 14,
        brand: "Fractal",
        name: "Fractal Design Pop Air",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 380,
        maxCoolerHeight: 170,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 5,
        fanSizes: [120, 140],
        price: 79
    },
    {
        id: 15,
        brand: "Lian Li",
        name: "Lian Li LANCOOL 216",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 392,
        maxCoolerHeight: 180,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 10,
        fanSizes: [120, 140],
        price: 99
    },
    {
        id: 16,
        brand: "Phanteks",
        name: "Phanteks Eclipse G360A",
        supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
        maxGpuLength: 400,
        maxCoolerHeight: 162,
        supportedPsuFormFactors: ["ATX"],
        maxCaseFans: 6,
        fanSizes: [120, 140],
        price: 89
    }
];
