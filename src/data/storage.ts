export interface Storage {
  id: number

  brand: "Samsung" | "WD" | "Crucial" | "Kingston"

  name: string

  type: "NVMe" | "SATA SSD"

  capacity: number // GB

  interface: string

  readSpeed: number

  writeSpeed: number

  price: number
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
    price: 99,
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
    price: 179,
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
    price: 109,
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
    price: 69,
  },

  {
    id: 5,
    brand: "Samsung",
    name: "970 Evo Plus 500GB",
    type: "NVMe",
    capacity: 500,
    interface: "PCIe 3.0",
    readSpeed: 3500,
    writeSpeed: 3200,
    price: 59,
  },

  {
    id: 6,
    brand: "WD",
    name: "SN770 1TB",
    type: "NVMe",
    capacity: 1000,
    interface: "PCIe 4.0",
    readSpeed: 5150,
    writeSpeed: 4900,
    price: 79,
  },

  {
    id: 7,
    brand: "Samsung",
    name: "990 Pro 4TB",
    type: "NVMe",
    capacity: 4000,
    interface: "PCIe 4.0",
    readSpeed: 7450,
    writeSpeed: 6900,
    price: 319,
  },

  {
    id: 8,
    brand: "Crucial",
    name: "T700 2TB",
    type: "NVMe",
    capacity: 2000,
    interface: "PCIe 5.0",
    readSpeed: 12400,
    writeSpeed: 11800,
    price: 279,
  },

  {
    id: 9,
    brand: "Kingston",
    name: "KC3000 2TB",
    type: "NVMe",
    capacity: 2000,
    interface: "PCIe 4.0",
    readSpeed: 7000,
    writeSpeed: 7000,
    price: 169,
  },

  {
    id: 10,
    brand: "WD",
    name: "Blue SATA 2TB",
    type: "SATA SSD",
    capacity: 2000,
    interface: "SATA III",
    readSpeed: 560,
    writeSpeed: 530,
    price: 129,
  },

  {
    id: 11,
    brand: "Samsung",
    name: "870 Evo 1TB",
    type: "SATA SSD",
    capacity: 1000,
    interface: "SATA III",
    readSpeed: 560,
    writeSpeed: 530,
    price: 89,
  },

  {
    id: 12,
    brand: "Crucial",
    name: "P3 Plus 1TB",
    type: "NVMe",
    capacity: 1000,
    interface: "PCIe 4.0",
    readSpeed: 5000,
    writeSpeed: 4200,
    price: 69,
  },

  {
    id: 13,
    brand: "Kingston",
    name: "NV3 1TB",
    type: "NVMe",
    capacity: 1000,
    interface: "PCIe 4.0",
    readSpeed: 6000,
    writeSpeed: 4000,
    price: 65,
  },

  {
    id: 14,
    brand: "WD",
    name: "SN850X 4TB",
    type: "NVMe",
    capacity: 4000,
    interface: "PCIe 4.0",
    readSpeed: 7300,
    writeSpeed: 6600,
    price: 299,
  },
]
