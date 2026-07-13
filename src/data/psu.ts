export interface PSU {

    id: number;

    brand: "Corsair" | "MSI" | "Cooler Master" | "Seasonic";

    name: string;

    wattage: number;

    efficiency: "80+ Bronze" | "80+ Gold" | "80+ Platinum";

    modular: "Non-Modular" | "Semi-Modular" | "Fully Modular";

    price: number;

}

export const psus: PSU[] = [

    {
        id: 1,
        brand: "Corsair",
        name: "RM650e",
        wattage: 650,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 99
    },

    {
        id: 2,
        brand: "Corsair",
        name: "RM750e",
        wattage: 750,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 119
    },

    {
        id: 3,
        brand: "MSI",
        name: "MAG A850GL",
        wattage: 850,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 139
    },

    {
        id: 4,
        brand: "Seasonic",
        name: "Focus GX-1000",
        wattage: 1000,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 189
    },

    {
        id: 5,
        brand: "Corsair",
        name: "RM850x",
        wattage: 850,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 149
    },

    {
        id: 6,
        brand: "Corsair",
        name: "RM1000e",
        wattage: 1000,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 179
    },

    {
        id: 7,
        brand: "MSI",
        name: "MPG A1000G",
        wattage: 1000,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 199
    },

    {
        id: 8,
        brand: "Cooler Master",
        name: "MWE Gold 650",
        wattage: 650,
        efficiency: "80+ Gold",
        modular: "Semi-Modular",
        price: 89
    },

    {
        id: 9,
        brand: "Cooler Master",
        name: "V850 SFX Gold",
        wattage: 850,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 139
    },

    {
        id: 10,
        brand: "Seasonic",
        name: "Core GX-750",
        wattage: 750,
        efficiency: "80+ Gold",
        modular: "Fully Modular",
        price: 119
    },

    {
        id: 11,
        brand: "Seasonic",
        name: "PRIME PX-1300",
        wattage: 1300,
        efficiency: "80+ Platinum",
        modular: "Fully Modular",
        price: 299
    },

    {
        id: 12,
        brand: "Corsair",
        name: "CX650",
        wattage: 650,
        efficiency: "80+ Bronze",
        modular: "Non-Modular",
        price: 69
    },

    {
        id: 13,
        brand: "MSI",
        name: "MAG A650BN",
        wattage: 650,
        efficiency: "80+ Bronze",
        modular: "Non-Modular",
        price: 59
    },

    {
        id: 14,
        brand: "Cooler Master",
        name: "V Platinum 1200",
        wattage: 1200,
        efficiency: "80+ Platinum",
        modular: "Fully Modular",
        price: 259
    }

];