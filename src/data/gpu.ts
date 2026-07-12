export interface GPU {

    id: number;

    brand: "NVIDIA" | "AMD" | "Intel";

    name: string;

    chipset: string;

    memory: number;      // GB

    memoryType: string;

    length: number;      // mm

    power: number;       // TDP

    pcie: string;

    price: number;

}

export const gpus: GPU[] = [

    {
        id: 1,
        brand: "NVIDIA",
        name: "RTX 4060",
        chipset: "AD107",
        memory: 8,
        memoryType: "GDDR6",
        length: 245,
        power: 115,
        pcie: "4.0",
        price: 299
    },

    {
        id: 2,
        brand: "NVIDIA",
        name: "RTX 4070 SUPER",
        chipset: "AD104",
        memory: 12,
        memoryType: "GDDR6X",
        length: 300,
        power: 220,
        pcie: "4.0",
        price: 599
    },

    {
        id: 3,
        brand: "NVIDIA",
        name: "RTX 5070",
        chipset: "Blackwell",
        memory: 12,
        memoryType: "GDDR7",
        length: 305,
        power: 250,
        pcie: "5.0",
        price: 549
    },

    {
        id: 4,
        brand: "NVIDIA",
        name: "RTX 5080",
        chipset: "Blackwell",
        memory: 16,
        memoryType: "GDDR7",
        length: 310,
        power: 360,
        pcie: "5.0",
        price: 999
    },

    {
        id: 5,
        brand: "AMD",
        name: "RX 7700 XT",
        chipset: "Navi 32",
        memory: 12,
        memoryType: "GDDR6",
        length: 280,
        power: 245,
        pcie: "4.0",
        price: 399
    },

    {
        id: 6,
        brand: "AMD",
        name: "RX 7800 XT",
        chipset: "Navi 32",
        memory: 16,
        memoryType: "GDDR6",
        length: 287,
        power: 263,
        pcie: "4.0",
        price: 499
    },
    {
        id: 7,
        brand: "NVIDIA",
        name: "RTX 4090",
        chipset: "AD102",
        memory: 24,
        memoryType: "GDDR6X",
        length: 336,
        power: 450,
        pcie: "4.0",
        price: 1599
    },
    {
        id: 8,
        brand: "AMD",
        name: "RX 7900 XTX",
        chipset: "Navi 31",
        memory: 24,
        memoryType: "GDDR6",
        length: 287,
        power: 355,
        pcie: "4.0",
        price: 999
    }
];