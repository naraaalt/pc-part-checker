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
    }

];