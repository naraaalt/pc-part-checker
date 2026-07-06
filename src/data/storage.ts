export interface Storage {

    id: number;

    brand: "Samsung" | "WD" | "Crucial" | "Kingston";

    name: string;

    type: "NVMe" | "SATA SSD";

    capacity: number; // GB

    interface: string;

    readSpeed: number;

    writeSpeed: number;

    price: number;

}

export const storages: Storage[] = [

    {
        id: 1,
        brand: "Samsung",
        name: "980 Pro 1TB",
        type: "NVMe",
        capacity: 1000,
        interface: "PCIe 4.0",
        readSpeed: 7000,
        writeSpeed: 5000,
        price: 99
    },

    {
        id: 2,
        brand: "Samsung",
        name: "990 Pro 2TB",
        type: "NVMe",
        capacity: 2000,
        interface: "PCIe 4.0",
        readSpeed: 7450,
        writeSpeed: 6900,
        price: 179
    },

    {
        id: 3,
        brand: "WD",
        name: "SN850X 1TB",
        type: "NVMe",
        capacity: 1000,
        interface: "PCIe 4.0",
        readSpeed: 7300,
        writeSpeed: 6300,
        price: 109
    },

    {
        id: 4,
        brand: "Crucial",
        name: "MX500 1TB",
        type: "SATA SSD",
        capacity: 1000,
        interface: "SATA III",
        readSpeed: 560,
        writeSpeed: 510,
        price: 69
    }

];