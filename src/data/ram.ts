export interface RAM {
  id: number

  brand: "Corsair" | "Kingston" | "G.Skill" | "Crucial"

  name: string

  type: "DDR4" | "DDR5"

  capacity: number // GB

  sticks: number

  speed: number // MHz

  casLatency: number

  voltage: number

  price: number
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
    price: 49,
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
    price: 129,
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
    price: 149,
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
    price: 79,
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
    price: 89,
  },

  {
    id: 6,
    brand: "Corsair",
    name: "Vengeance RGB 64GB",
    type: "DDR5",
    capacity: 64,
    sticks: 2,
    speed: 6000,
    casLatency: 36,
    voltage: 1.4,
    price: 219,
  },

  {
    id: 7,
    brand: "G.Skill",
    name: "Ripjaws V 16GB",
    type: "DDR4",
    capacity: 16,
    sticks: 2,
    speed: 3600,
    casLatency: 16,
    voltage: 1.35,
    price: 45,
  },

  {
    id: 8,
    brand: "Kingston",
    name: "FURY Beast 32GB",
    type: "DDR5",
    capacity: 32,
    sticks: 2,
    speed: 6000,
    casLatency: 36,
    voltage: 1.35,
    price: 109,
  },

  {
    id: 9,
    brand: "Crucial",
    name: "Pro DDR5 32GB",
    type: "DDR5",
    capacity: 32,
    sticks: 2,
    speed: 5600,
    casLatency: 46,
    voltage: 1.1,
    price: 99,
  },

  {
    id: 10,
    brand: "G.Skill",
    name: "Trident Z5 RGB 64GB",
    type: "DDR5",
    capacity: 64,
    sticks: 2,
    speed: 6400,
    casLatency: 32,
    voltage: 1.4,
    price: 239,
  },

  {
    id: 11,
    brand: "Corsair",
    name: "Vengeance LPX 32GB",
    type: "DDR4",
    capacity: 32,
    sticks: 2,
    speed: 3200,
    casLatency: 16,
    voltage: 1.35,
    price: 79,
  },

  {
    id: 12,
    brand: "Kingston",
    name: "FURY Renegade 32GB",
    type: "DDR5",
    capacity: 32,
    sticks: 2,
    speed: 6400,
    casLatency: 32,
    voltage: 1.4,
    price: 139,
  },

  {
    id: 13,
    brand: "Crucial",
    name: "Ballistix 16GB",
    type: "DDR4",
    capacity: 16,
    sticks: 2,
    speed: 3200,
    casLatency: 16,
    voltage: 1.35,
    price: 44,
  },

  {
    id: 14,
    brand: "G.Skill",
    name: "Flare X5 32GB",
    type: "DDR5",
    capacity: 32,
    sticks: 2,
    speed: 6000,
    casLatency: 30,
    voltage: 1.35,
    price: 119,
  },

  {
    id: 15,
    brand: "Corsair",
    name: "Dominator Titanium 48GB",
    type: "DDR5",
    capacity: 48,
    sticks: 2,
    speed: 7200,
    casLatency: 34,
    voltage: 1.45,
    price: 229,
  },
]
