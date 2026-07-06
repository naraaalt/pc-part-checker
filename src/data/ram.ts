export interface RAM {

    id: number;

    brand: "Corsair" | "Kingston" | "G.Skill" | "Crucial";

    name: string;

    type: "DDR4" | "DDR5";

    capacity: number; // GB

    sticks: number;

    speed: number; // MHz

    casLatency: number;

    voltage: number;

    price: number;

}

export const rams: RAM[] = [

    {
        id: 1,
        brand: "Corsair",
        name: "Vengeance LPX 16GB",
        type: "DDR4",
        capacity: 16,
        sticks: 2,
        speed: 3200,
        casLatency: 16,
        voltage: 1.35,
        price: 49
    },

    {
        id: 2,
        brand: "Corsair",
        name: "Vengeance RGB 32GB",
        type: "DDR5",
        capacity: 32,
        sticks: 2,
        speed: 6000,
        casLatency: 36,
        voltage: 1.35,
        price: 129
    },

    {
        id: 3,
        brand: "G.Skill",
        name: "Trident Z5 Neo 32GB",
        type: "DDR5",
        capacity: 32,
        sticks: 2,
        speed: 6000,
        casLatency: 30,
        voltage: 1.35,
        price: 149
    },

    {
        id: 4,
        brand: "Kingston",
        name: "FURY Beast 16GB",
        type: "DDR5",
        capacity: 16,
        sticks: 2,
        speed: 5600,
        casLatency: 40,
        voltage: 1.25,
        price: 79
    },

    {
        id: 5,
        brand: "Crucial",
        name: "Pro DDR4 32GB",
        type: "DDR4",
        capacity: 32,
        sticks: 2,
        speed: 3600,
        casLatency: 18,
        voltage: 1.35,
        price: 89
    }

];