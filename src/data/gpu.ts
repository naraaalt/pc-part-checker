export interface GPU {
  id: number

  brand: "NVIDIA" | "AMD" | "Intel"

  name: string

  chipset: string

  memory: number // GB

  memoryType: string

  length: number // mm

  power: number // TDP

  pcie: string

  price: number
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
    price: 299,
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
    price: 599,
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
    price: 549,
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
    price: 999,
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
    price: 399,
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
    price: 499,
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
    price: 1599,
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
    price: 999,
  },

  {
    id: 9,
    brand: "NVIDIA",
    name: "RTX 4060 Ti",
    chipset: "AD106",
    memory: 16,
    memoryType: "GDDR6",
    length: 250,
    power: 165,
    pcie: "4.0",
    price: 499,
  },

  {
    id: 10,
    brand: "NVIDIA",
    name: "RTX 4070 Ti SUPER",
    chipset: "AD103",
    memory: 16,
    memoryType: "GDDR6X",
    length: 310,
    power: 285,
    pcie: "4.0",
    price: 799,
  },

  {
    id: 11,
    brand: "NVIDIA",
    name: "RTX 5090",
    chipset: "Blackwell",
    memory: 32,
    memoryType: "GDDR7",
    length: 340,
    power: 575,
    pcie: "5.0",
    price: 1999,
  },

  {
    id: 12,
    brand: "NVIDIA",
    name: "RTX 3050",
    chipset: "GA106",
    memory: 8,
    memoryType: "GDDR6",
    length: 242,
    power: 130,
    pcie: "4.0",
    price: 249,
  },

  {
    id: 13,
    brand: "AMD",
    name: "RX 7600",
    chipset: "Navi 33",
    memory: 8,
    memoryType: "GDDR6",
    length: 270,
    power: 165,
    pcie: "4.0",
    price: 269,
  },

  {
    id: 14,
    brand: "AMD",
    name: "RX 7900 GRE",
    chipset: "Navi 31",
    memory: 16,
    memoryType: "GDDR6",
    length: 280,
    power: 260,
    pcie: "4.0",
    price: 549,
  },

  {
    id: 15,
    brand: "AMD",
    name: "RX 9070 XT",
    chipset: "Navi 48",
    memory: 16,
    memoryType: "GDDR6",
    length: 300,
    power: 304,
    pcie: "5.0",
    price: 599,
  },

  {
    id: 16,
    brand: "Intel",
    name: "Arc A770",
    chipset: "Alchemist",
    memory: 16,
    memoryType: "GDDR6",
    length: 295,
    power: 225,
    pcie: "4.0",
    price: 349,
  },

  {
    id: 17,
    brand: "Intel",
    name: "Arc B580",
    chipset: "Battlemage",
    memory: 12,
    memoryType: "GDDR6",
    length: 272,
    power: 190,
    pcie: "4.0",
    price: 249,
  },

  {
    id: 18,
    brand: "NVIDIA",
    name: "RTX 4080 SUPER",
    chipset: "AD103",
    memory: 16,
    memoryType: "GDDR6X",
    length: 310,
    power: 320,
    pcie: "4.0",
    price: 999,
  },
]
