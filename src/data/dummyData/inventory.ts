interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  unitOfMeasure: string;
  currentStockLevel: number;
  minStockLevel: number;
  lastUpdate: string;
}
export const inventoryItems: InventoryItem[] = [
  {
    id: "1a2b3c",
    itemName: "Aluminum Sheet",
    category: "Raw Material",
    unitOfMeasure: "kg",
    currentStockLevel: 250,
    minStockLevel: 100,
    lastUpdate: "2025-07-06T14:23:00Z",
  },
  {
    id: "4d5e6f",
    itemName: "Steel Bolts",
    category: "Hardware",
    unitOfMeasure: "pieces",
    currentStockLevel: 1200,
    minStockLevel: 500,
    lastUpdate: "2025-07-05T10:15:00Z",
  },
  {
    id: "7g8h9i",
    itemName: "Copper Wire",
    category: "Electrical",
    unitOfMeasure: "meters",
    currentStockLevel: 340,
    minStockLevel: 200,
    lastUpdate: "2025-07-04T08:47:00Z",
  },
  {
    id: "0j1k2l",
    itemName: "Packing Tape",
    category: "Packaging",
    unitOfMeasure: "rolls",
    currentStockLevel: 80,
    minStockLevel: 50,
    lastUpdate: "2025-07-06T12:00:00Z",
  },
  {
    id: "3m4n5o",
    itemName: "Printer Toner",
    category: "Office Supplies",
    unitOfMeasure: "cartridges",
    currentStockLevel: 15,
    minStockLevel: 10,
    lastUpdate: "2025-07-07T09:30:00Z",
  },
];
