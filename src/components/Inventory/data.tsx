import React, { useState } from "react";
import {
  Search,
  Plus,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  quantity: string;
  lotQty: number;
  currentStockLevel: number;
  reorderLevel: number;
  actionTakenBy: string;
  lastUpdate: string;
}

// Sample data that matches your design
const inventoryItems: InventoryItem[] = [
  {
    id: "#ITM2382",
    itemName: "Bread",
    category: "Loaf",
    quantity: "19 Kg",
    lotQty: 10,
    currentStockLevel: 10,
    reorderLevel: 13,
    actionTakenBy: "Esther Howard",
    lastUpdate: "9/4/12",
  },
  {
    id: "#ITM1242",
    itemName: "Rice",
    category: "Grain",
    quantity: "12 Kg",
    lotQty: 22,
    currentStockLevel: 12,
    reorderLevel: 20,
    actionTakenBy: "Kristin Watson",
    lastUpdate: "10/6/13",
  },
  {
    id: "#ITM7561",
    itemName: "Baguette Do...",
    category: "Dough",
    quantity: "13 Kg",
    lotQty: 33,
    currentStockLevel: 13,
    reorderLevel: 17,
    actionTakenBy: "Marvin McKinney",
    lastUpdate: "4/4/18",
  },
  {
    id: "#ITM9873",
    itemName: "Vanilla Ca...",
    category: "Cake",
    quantity: "29 Kg",
    lotQty: 12,
    currentStockLevel: 20,
    reorderLevel: 22,
    actionTakenBy: "Cameron Williamson",
    lastUpdate: "3/4/16",
  },
  {
    id: "#ITM9873",
    itemName: "Wheat bread",
    category: "Loaf",
    quantity: "38 Kg",
    lotQty: 45,
    currentStockLevel: 426,
    reorderLevel: 647,
    actionTakenBy: "Eleanor Pena",
    lastUpdate: "8/21/15",
  },
  {
    id: "#ITM9873",
    itemName: "Chocolate ca...",
    category: "Cake",
    quantity: "23 Kg",
    lotQty: 12,
    currentStockLevel: 24,
    reorderLevel: 130,
    actionTakenBy: "Guy Hawkins",
    lastUpdate: "5/27/15",
  },
  {
    id: "#ITM9873",
    itemName: "Wholeme...",
    category: "Grain",
    quantity: "21 Kg",
    lotQty: 55,
    currentStockLevel: 78,
    reorderLevel: 703,
    actionTakenBy: "Cody Fisher",
    lastUpdate: "8/2/19",
  },
  {
    id: "#ITM9873",
    itemName: "Wholeme...",
    category: "Raw material",
    quantity: "44 Kg",
    lotQty: 12,
    currentStockLevel: 14,
    reorderLevel: 877,
    actionTakenBy: "Darrell Steward",
    lastUpdate: "7/11/19",
  },
  {
    id: "#ITM9873",
    itemName: "Wholeme...",
    category: "Raw material",
    quantity: "98 Kg",
    lotQty: 28,
    currentStockLevel: 17,
    reorderLevel: 583,
    actionTakenBy: "Jane Cooper",
    lastUpdate: "1/31/14",
  },
  {
    id: "#ITM9873",
    itemName: "Wholeme...",
    category: "Loaf",
    quantity: "23 Kg",
    lotQty: 10,
    currentStockLevel: 357,
    reorderLevel: 196,
    actionTakenBy: "Dianne Russell",
    lastUpdate: "5/19/12",
  },
  {
    id: "#ITM9873",
    itemName: "Wholeme...",
    category: "Dough",
    quantity: "99 Kg",
    lotQty: 11,
    currentStockLevel: 540,
    reorderLevel: 429,
    actionTakenBy: "Ronald Richards",
    lastUpdate: "9/23/16",
  },
];

type SortField = keyof InventoryItem;
type SortOrder = "asc" | "desc";

export default function InventoryList() {
  const [items, setItems] = useState<InventoryItem[]>(inventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("itemName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    itemName: "",
    category: "",
    quantity: "",
    lotQty: 0,
    currentStockLevel: 0,
    reorderLevel: 0,
    actionTakenBy: "",
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field)
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );
  };

  const handleAddItem = () => {
    if (
      newItem.itemName &&
      newItem.category &&
      newItem.quantity &&
      newItem.actionTakenBy
    ) {
      const item: InventoryItem = {
        id: `#ITM${Date.now()}`,
        itemName: newItem.itemName,
        category: newItem.category,
        quantity: newItem.quantity,
        lotQty: newItem.lotQty || 0,
        currentStockLevel: newItem.currentStockLevel || 0,
        reorderLevel: newItem.reorderLevel || 0,
        actionTakenBy: newItem.actionTakenBy,
        lastUpdate: new Date().toLocaleDateString("en-US", {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
        }),
      };
      setItems([...items, item]);
      setNewItem({
        itemName: "",
        category: "",
        quantity: "",
        lotQty: 0,
        currentStockLevel: 0,
        reorderLevel: 0,
        actionTakenBy: "",
      });
      setShowAddForm(false);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.actionTakenBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span className="text-nowrap">{children}</span>
        {getSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Inventory List
          </h1>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center bg-green-600 px-3 rounded-r-md">
                <Search className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Activity Log */}
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Activity Log
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>

            {/* Filters */}
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Add New Item
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  value={newItem.itemName || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, itemName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newItem.category || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  value={newItem.quantity || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                  placeholder="e.g., 25 Kg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lot Qty
                </label>
                <input
                  type="number"
                  value={newItem.lotQty || 0}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      lotQty: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Stock Level
                </label>
                <input
                  type="number"
                  value={newItem.currentStockLevel || 0}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      currentStockLevel: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Re-order Level
                </label>
                <input
                  type="number"
                  value={newItem.reorderLevel || 0}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      reorderLevel: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Action Taken By
                </label>
                <input
                  type="text"
                  value={newItem.actionTakenBy || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, actionTakenBy: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
          </div>
        )}

        {/* Table View */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortableHeader field="id">Item ID</SortableHeader>
                <SortableHeader field="itemName">Item Name</SortableHeader>
                <SortableHeader field="category">Category</SortableHeader>
                <SortableHeader field="quantity">Quantity</SortableHeader>
                <SortableHeader field="lotQty">Lot Qty</SortableHeader>
                <SortableHeader field="currentStockLevel">
                  Current Stock Level
                </SortableHeader>
                <SortableHeader field="reorderLevel">
                  Re-order Level
                </SortableHeader>
                <SortableHeader field="actionTakenBy">
                  Action taken by
                </SortableHeader>
                <SortableHeader field="lastUpdate">Last Update</SortableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedItems.map((item, index) => (
                <tr key={`${item.id}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.itemName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.lotQty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.currentStockLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.reorderLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.actionTakenBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
