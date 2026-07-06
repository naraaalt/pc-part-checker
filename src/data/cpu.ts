export interface CPU {

    id: number;

    brand: "AMD" | "Intel";

    name: string;

    socket: string;

    cores: number;

    threads: number;

    baseClock: number;

    boostClock: number;

    tdp: number;

    integratedGraphics: boolean;

    price: number;

}

export const cpus: CPU[] = [

    {
        id: 1,
        brand: "AMD",
        name: "Ryzen 5 5600",
        socket: "AM4",
        cores: 6,
        threads: 12,
        baseClock: 3.5,
        boostClock: 4.4,
        tdp: 65,
        integratedGraphics: false,
        price: 129
    },

    {
        id: 2,
        brand: "AMD",
        name: "Ryzen 7 5700X",
        socket: "AM4",
        cores: 8,
        threads: 16,
        baseClock: 3.4,
        boostClock: 4.6,
        tdp: 65,
        integratedGraphics: false,
        price: 189
    },

    {
        id: 3,
        brand: "AMD",
        name: "Ryzen 7 7800X3D",
        socket: "AM5",
        cores: 8,
        threads: 16,
        baseClock: 4.2,
        boostClock: 5.0,
        tdp: 120,
        integratedGraphics: true,
        price: 379
    },

    {
        id: 4,
        brand: "AMD",
        name: "Ryzen 9 9900X",
        socket: "AM5",
        cores: 12,
        threads: 24,
        baseClock: 4.4,
        boostClock: 5.6,
        tdp: 120,
        integratedGraphics: true,
        price: 499
    },

    {
        id: 5,
        brand: "Intel",
        name: "Core i5-12400F",
        socket: "LGA1700",
        cores: 6,
        threads: 12,
        baseClock: 2.5,
        boostClock: 4.4,
        tdp: 117,
        integratedGraphics: false,
        price: 169
    },

    {
        id: 6,
        brand: "Intel",
        name: "Core i5-13400F",
        socket: "LGA1700",
        cores: 10,
        threads: 16,
        baseClock: 2.5,
        boostClock: 4.6,
        tdp: 148,
        integratedGraphics: false,
        price: 209
    },

    {
        id: 7,
        brand: "Intel",
        name: "Core i7-13700K",
        socket: "LGA1700",
        cores: 16,
        threads: 24,
        baseClock: 3.4,
        boostClock: 5.4,
        tdp: 253,
        integratedGraphics: true,
        price: 379
    },

    {
        id: 8,
        brand: "Intel",
        name: "Core Ultra 7 265K",
        socket: "LGA1851",
        cores: 20,
        threads: 20,
        baseClock: 3.9,
        boostClock: 5.5,
        tdp: 125,
        integratedGraphics: true,
        price: 399
    }

];