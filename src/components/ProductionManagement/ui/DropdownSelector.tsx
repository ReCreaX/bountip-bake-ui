import React, { useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import productManagementService from "@/services/productManagementService";
import { useSelectedOutlet } from "@/hooks/useSelectedOutlet";
import { SystemDefaults } from "@/types/systemDefaults";

interface DropdownSelectorProps {
  searchPlaceholder: string;
  items: string[];
  placeholder?: string;
  onSelect: (item: string) => void;
  madeFor?: SystemDefaults;
}

export function DropdownSelector({
  searchPlaceholder,
  items,
  placeholder = "Select Item",
  onSelect,
  madeFor,
}: DropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showAddNew, setShowAddNew] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState("");
  const [localItems, setLocalItems] = useState<string[]>(items);
  const outletId = useSelectedOutlet()?.outlet.id;

  const filteredItems = localItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelect = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleAddNewItem = async () => {
    if (!outletId) {
      console.error("Missing outletId");
      return;
    }

    if (!madeFor) {
      console.error("Missing madeFor (SystemDefaults type)");
      return;
    }
  
    console.log(newItem, "Add new item")
    const trimmed = newItem.trim();
    if (!trimmed || localItems.includes(trimmed)) return;

    if (
      madeFor === SystemDefaults.CATEGORY ||
      madeFor === SystemDefaults.PACKAGING_METHOD ||
      madeFor === SystemDefaults.ALLERGENS ||
      madeFor === SystemDefaults.PREPARATION_AREA ||
      madeFor === SystemDefaults.WEIGHT_SCALE
    ) {
      try {
        const response = await productManagementService.createSystemDefaults(
          madeFor,
          trimmed,
          outletId
        );
        console.log(response);
        

        const updatedItems = [...localItems, trimmed];
        setLocalItems(updatedItems);
        setSelectedItem(trimmed);
        onSelect(trimmed);
      } catch (error) {
        console.error("Failed to add new item:", error);
      } finally {
        setNewItem("");
        setShowAddNew(false);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm">{selectedItem || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-1 bg-gray-800 rounded-lg shadow-lg z-10">
          <div className="relative p-3 border-b border-gray-700">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white text-sm rounded border-none outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          <div>
            {filteredItems.map((item) => (
              <button
                key={item}
                onClick={() => handleItemSelect(item)}
                className="w-full px-4 py-3 text-left text-white text-sm hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
              >
                {item}
              </button>
            ))}

            {!showAddNew ? (
              <button
                onClick={() => setShowAddNew(true)}
                className="w-full px-4 py-3 text-left text-green-400 text-sm hover:bg-gray-700 transition-colors flex items-center gap-2 border-t border-gray-700"
              >
                <Plus className="w-4 h-4" />
                Add new
              </button>
            ) : (
              <div className="p-3 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type new item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <button
                    onClick={handleAddNewItem}
                    className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
