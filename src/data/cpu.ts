export interface CPU {
  id: number

  brand: "AMD" | "Intel"

  name: string

  socket: string

  cores: number

  threads: number

  baseClock: number

  boostClock: number

  tdp: number

  integratedGraphics: boolean

  price: number
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
    price: 129,
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
    price: 189,
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
    price: 379,
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
    price: 499,
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
    price: 169,
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
    price: 209,
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
    price: 379,
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
    price: 399,
  },
  {
    id: 9,
    brand: "AMD",
    name: "Ryzen 9 7950X3D",
    socket: "AM5",
    cores: 16,
    threads: 32,
    baseClock: 4.2,
    boostClock: 5.7,
    tdp: 120,
    integratedGraphics: true,
    price: 599,
  },
  {
    id: 10,
    brand: "Intel",
    name: "Core i9-14900K",
    socket: "LGA1700",
    cores: 24,
    threads: 32,
    baseClock: 3.2,
    boostClock: 6.0,
    tdp: 253,
    integratedGraphics: true,
    price: 549,
  },

  {
    id: 11,
    brand: "AMD",
    name: "Ryzen 5 7600",
    socket: "AM5",
    cores: 6,
    threads: 12,
    baseClock: 3.8,
    boostClock: 5.1,
    tdp: 65,
    integratedGraphics: true,
    price: 229,
  },

  {
    id: 12,
    brand: "AMD",
    name: "Ryzen 5 9600X",
    socket: "AM5",
    cores: 6,
    threads: 12,
    baseClock: 3.9,
    boostClock: 5.4,
    tdp: 65,
    integratedGraphics: true,
    price: 279,
  },

  {
    id: 13,
    brand: "AMD",
    name: "Ryzen 7 9700X",
    socket: "AM5",
    cores: 8,
    threads: 16,
    baseClock: 3.8,
    boostClock: 5.5,
    tdp: 65,
    integratedGraphics: true,
    price: 359,
  },

  {
    id: 14,
    brand: "AMD",
    name: "Ryzen 9 7950X",
    socket: "AM5",
    cores: 16,
    threads: 32,
    baseClock: 4.5,
    boostClock: 5.7,
    tdp: 170,
    integratedGraphics: true,
    price: 549,
  },

  {
    id: 15,
    brand: "Intel",
    name: "Core i5-14600K",
    socket: "LGA1700",
    cores: 14,
    threads: 20,
    baseClock: 3.5,
    boostClock: 5.3,
    tdp: 181,
    integratedGraphics: true,
    price: 319,
  },

  {
    id: 16,
    brand: "Intel",
    name: "Core i7-14700F",
    socket: "LGA1700",
    cores: 20,
    threads: 28,
    baseClock: 2.1,
    boostClock: 5.4,
    tdp: 219,
    integratedGraphics: false,
    price: 339,
  },

  {
    id: 17,
    brand: "Intel",
    name: "Core i5-14400F",
    socket: "LGA1700",
    cores: 10,
    threads: 16,
    baseClock: 2.5,
    boostClock: 4.7,
    tdp: 148,
    integratedGraphics: false,
    price: 199,
  },

  {
    id: 18,
    brand: "Intel",
    name: "Core Ultra 5 245K",
    socket: "LGA1851",
    cores: 14,
    threads: 14,
    baseClock: 4.2,
    boostClock: 5.2,
    tdp: 125,
    integratedGraphics: true,
    price: 309,
  },

  {
    id: 19,
    brand: "AMD",
    name: "Ryzen 7 5800X3D",
    socket: "AM4",
    cores: 8,
    threads: 16,
    baseClock: 3.4,
    boostClock: 4.5,
    tdp: 105,
    integratedGraphics: false,
    price: 299,
  },

  {
    id: 20,
    brand: "Intel",
    name: "Core i9-13900K",
    socket: "LGA1700",
    cores: 24,
    threads: 32,
    baseClock: 3.0,
    boostClock: 5.8,
    tdp: 253,
    integratedGraphics: true,
    price: 569,
  },
]
