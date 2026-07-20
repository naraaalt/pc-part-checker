export interface CpuCooler {
    id: number;
    brand: "Noctua" | "Cooler Master" | "Corsair" | "NZXT" | "be quiet!" | "Arctic" | "DeepCool";
    name: string;
    type: "Air" | "AIO";
    sockets: string[];        // ["AM4","AM5","LGA1700","LGA1851"]
    tdpRating: number;        // W cooling capacity
    height?: number;          // mm — Air only
    radiatorSize?: 120 | 240 | 280 | 360;  // AIO only
    fans: number;
    price: number;
}

export const cpuCoolers: CpuCooler[] = [
    {
        id: 1,
        brand: "Noctua",
        name: "Noctua NH-D15 chromax.black",
        type: "Air",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 220,
        height: 165,
        fans: 2,
        price: 109
    },
    {
        id: 2,
        brand: "Cooler Master",
        name: "Cooler Master Hyper 212 Halo",
        type: "Air",
        sockets: ["AM4", "AM5", "LGA1700"],
        tdpRating: 150,
        height: 154,
        fans: 1,
        price: 45
    },
    {
        id: 3,
        brand: "be quiet!",
        name: "be quiet! Dark Rock Pro 5",
        type: "Air",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 270,
        height: 168,
        fans: 2,
        price: 99
    },
    {
        id: 4,
        brand: "Corsair",
        name: "Corsair iCUE H100i Elite Capellix XT",
        type: "AIO",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 250,
        radiatorSize: 240,
        fans: 2,
        price: 149
    },
    {
        id: 5,
        brand: "NZXT",
        name: "NZXT Kraken 360",
        type: "AIO",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 300,
        radiatorSize: 360,
        fans: 3,
        price: 179
    },
    {
        id: 6,
        brand: "Arctic",
        name: "Arctic Liquid Freezer III 280",
        type: "AIO",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 280,
        radiatorSize: 280,
        fans: 2,
        price: 115
    },
    {
        id: 7,
        brand: "DeepCool",
        name: "DeepCool AK400",
        type: "Air",
        sockets: ["AM4", "AM5", "LGA1700"],
        tdpRating: 220,
        height: 155,
        fans: 1,
        price: 35
    },
    {
        id: 8,
        brand: "Noctua",
        name: "Noctua NH-U12S Redux",
        type: "Air",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 150,
        height: 158,
        fans: 1,
        price: 49
    },
    {
        id: 9,
        brand: "Arctic",
        name: "Arctic Freezer 36",
        type: "Air",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 220,
        height: 159,
        fans: 2,
        price: 39
    },
    {
        id: 10,
        brand: "be quiet!",
        name: "be quiet! Pure Loop 2 240",
        type: "AIO",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 230,
        radiatorSize: 240,
        fans: 2,
        price: 105
    },
    {
        id: 11,
        brand: "Corsair",
        name: "Corsair iCUE H150i Elite LCD XT",
        type: "AIO",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 300,
        radiatorSize: 360,
        fans: 3,
        price: 259
    },
    {
        id: 12,
        brand: "DeepCool",
        name: "DeepCool LS720 SE",
        type: "AIO",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 300,
        radiatorSize: 360,
        fans: 3,
        price: 139
    },
    {
        id: 13,
        brand: "NZXT",
        name: "NZXT T120",
        type: "Air",
        sockets: ["AM4", "AM5", "LGA1700"],
        tdpRating: 180,
        height: 159,
        fans: 1,
        price: 49
    },
    {
        id: 14,
        brand: "Noctua",
        name: "Noctua NH-L9i-17xx (Low Profile)",
        type: "Air",
        sockets: ["LGA1700"],
        tdpRating: 65,
        height: 37,
        fans: 1,
        price: 44
    },
    {
        id: 15,
        brand: "Cooler Master",
        name: "Cooler Master MasterLiquid ML120L V2",
        type: "AIO",
        sockets: ["AM4", "AM5", "LGA1700"],
        tdpRating: 150,
        radiatorSize: 120,
        fans: 1,
        price: 65
    },
    {
        id: 16,
        brand: "DeepCool",
        name: "DeepCool AK620",
        type: "Air",
        sockets: ["AM4", "AM5", "LGA1700", "LGA1851"],
        tdpRating: 260,
        height: 160,
        fans: 2,
        price: 64
    }
];
