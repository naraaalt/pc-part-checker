export interface Motherboard {

    id: number;

    brand: "ASUS" | "MSI" | "Gigabyte" | "ASRock";

    name: string;

    socket: string;

    chipset: string;

    formFactor: "ATX" | "Micro-ATX" | "Mini-ITX";

    ramType: "DDR4" | "DDR5";

    ramSlots: number;

    maxMemory: number;

    pcie: string;

    m2Slots: number;

    sataPorts: number;

    wifi: boolean;

    price: number;

}

export const motherboards: Motherboard[] = [

    {
        id: 1,
        brand: "MSI",
        name: "B550 Tomahawk",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        ramType: "DDR4",
        ramSlots: 4,
        maxMemory: 128,
        pcie: "4.0",
        m2Slots: 2,
        sataPorts: 6,
        wifi: false,
        price: 169
    },

    {
        id: 2,
        brand: "ASUS",
        name: "ROG Strix B650-A",
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 3,
        sataPorts: 4,
        wifi: true,
        price: 249
    },

    {
        id: 3,
        brand: "Gigabyte",
        name: "B650 Gaming X AX",
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 3,
        sataPorts: 4,
        wifi: true,
        price: 199
    },

    {
        id: 4,
        brand: "MSI",
        name: "PRO B760M-A WiFi",
        socket: "LGA1700",
        chipset: "B760",
        formFactor: "Micro-ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 2,
        sataPorts: 4,
        wifi: true,
        price: 179
    },

    {
        id: 5,
        brand: "ASUS",
        name: "ROG Z790-E Gaming",
        socket: "LGA1700",
        chipset: "Z790",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 5,
        sataPorts: 4,
        wifi: true,
        price: 469
    },

    {
        id: 6,
        brand: "MSI",
        name: "MEG Z890 ACE",
        socket: "LGA1851",
        chipset: "Z890",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 5,
        sataPorts: 4,
        wifi: true,
        price: 649
    },
    {
        id: 7,
        brand: "Gigabyte",
        name: "X670E AORUS MASTER",
        socket: "AM5",
        chipset: "X670E",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 4,
        sataPorts: 6,
        wifi: true,
        price: 499
    },

    {
        id: 8,
        brand: "ASRock",
        name: "B650 Steel Legend",
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 3,
        sataPorts: 4,
        wifi: true,
        price: 219
    },

    {
        id: 9,
        brand: "ASUS",
        name: "TUF Gaming B550-PLUS",
        socket: "AM4",
        chipset: "B550",
        formFactor: "ATX",
        ramType: "DDR4",
        ramSlots: 4,
        maxMemory: 128,
        pcie: "4.0",
        m2Slots: 2,
        sataPorts: 6,
        wifi: false,
        price: 149
    },

    {
        id: 10,
        brand: "MSI",
        name: "MAG B650 Tomahawk",
        socket: "AM5",
        chipset: "B650",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 3,
        sataPorts: 6,
        wifi: true,
        price: 219
    },

    {
        id: 11,
        brand: "Gigabyte",
        name: "Z790 AORUS Elite",
        socket: "LGA1700",
        chipset: "Z790",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 4,
        sataPorts: 6,
        wifi: true,
        price: 289
    },

    {
        id: 12,
        brand: "ASRock",
        name: "B760M Steel Legend",
        socket: "LGA1700",
        chipset: "B760",
        formFactor: "Micro-ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 2,
        sataPorts: 4,
        wifi: true,
        price: 159
    },

    {
        id: 13,
        brand: "ASUS",
        name: "ROG Strix X670E-E",
        socket: "AM5",
        chipset: "X670E",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 4,
        sataPorts: 6,
        wifi: true,
        price: 469
    },

    {
        id: 14,
        brand: "MSI",
        name: "PRO Z790-A WiFi",
        socket: "LGA1700",
        chipset: "Z790",
        formFactor: "ATX",
        ramType: "DDR5",
        ramSlots: 4,
        maxMemory: 192,
        pcie: "5.0",
        m2Slots: 4,
        sataPorts: 6,
        wifi: true,
        price: 259
    },

    {
        id: 15,
        brand: "Gigabyte",
        name: "B760I AORUS Pro",
        socket: "LGA1700",
        chipset: "B760",
        formFactor: "Mini-ITX",
        ramType: "DDR5",
        ramSlots: 2,
        maxMemory: 96,
        pcie: "5.0",
        m2Slots: 2,
        sataPorts: 4,
        wifi: true,
        price: 219
    },

    {
        id: 16,
        brand: "ASRock",
        name: "B650E PG-ITX",
        socket: "AM5",
        chipset: "B650E",
        formFactor: "Mini-ITX",
        ramType: "DDR5",
        ramSlots: 2,
        maxMemory: 96,
        pcie: "5.0",
        m2Slots: 2,
        sataPorts: 4,
        wifi: true,
        price: 249
    }
];