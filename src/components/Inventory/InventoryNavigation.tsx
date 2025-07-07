"use client";
import { useState } from "react";

export default function InventoryNavigation() {
  const [activeTab, setActiveTab] = useState("Inventory Items");

  const tabs = [
    "Inventory Items",
    "Add/Receive",
    "Components",
    "Supplier",
    "Stock Count",
    "Transfer",
    "Procurement",
  ];

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <div className="bg-white rounded-[10px]">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <div key={tab} className="flex flex-col items-center">
              <button
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-normal text-sm transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-[#1C1B20]"
                    : "text-[#A6A6A6] hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
              {/* Custom underline/highlight */}
              <div
                className={`transition-all duration-300 ${
                  activeTab === tab
                    ? " w-full h-[6px] bg-[#15BA5C] rounded-t-full"
                    : "h-[6px] w-full bg-transparent"
                }`}
              />
            </div>
          ))}
        </nav>
      </div>

      {/* Content area to show which tab is active */}
      <div className="bg-white p-6">
        {/* <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {activeTab}
          </h2>
          <p className="text-gray-600">Content for {activeTab} would go here</p>
        </div> */}
        <InventoryList/>
      </div>
    </div>
  );
}

const InventoryTable =()=>{
    return(
        <section className="">

        </section>
    )
}

const EmptyTable =()=>{
    return(
        <section className="">

        </section>
    )
}


// pages/index.tsx
import { Search, Plus, Filter, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { inventoryItems } from "@/data/dummyData/inventory";

interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  unitOfMeasure: string;
  currentStockLevel: number;
  minStockLevel: number;
  lastUpdate: string;
}

type SortField = keyof InventoryItem;
type SortOrder = 'asc' | 'desc';

export function InventoryList() {
  const [items, setItems] = useState<InventoryItem[]>(inventoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('itemName');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    itemName: '',
    category: '',
    unitOfMeasure: '',
    currentStockLevel: 0,
    minStockLevel: 0,
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 text-gray-400" />;
    return sortOrder === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-gray-600" /> : 
      <ChevronDown className="w-4 h-4 text-gray-600" />;
  };

  const handleAddItem = () => {
    if (newItem.itemName && newItem.category && newItem.unitOfMeasure) {
      const item: InventoryItem = {
        id: Date.now().toString(),
        itemName: newItem.itemName,
        category: newItem.category,
        unitOfMeasure: newItem.unitOfMeasure,
        currentStockLevel: newItem.currentStockLevel || 0,
        minStockLevel: newItem.minStockLevel || 0,
        lastUpdate: new Date().toISOString().split('T')[0],
      };
      setItems([...items, item]);
      setNewItem({
        itemName: '',
        category: '',
        unitOfMeasure: '',
        currentStockLevel: 0,
        minStockLevel: 0,
      });
      setShowAddForm(false);
    }
  };

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th 
      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span className="text-nowrap">{children}</span>
        {getSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="min-h-screen ">
      <div className="  py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Inventory List</h1>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            {/* Activity Log */}
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Activity Log
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
            
            {/* Filters */}
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItem.itemName || ''}
                  onChange={(e) => setNewItem({...newItem, itemName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newItem.category || ''}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measure</label>
                <input
                  type="text"
                  value={newItem.unitOfMeasure || ''}
                  onChange={(e) => setNewItem({...newItem, unitOfMeasure: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock Level</label>
                <input
                  type="number"
                  value={newItem.currentStockLevel || 0}
                  onChange={(e) => setNewItem({...newItem, currentStockLevel: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                <input
                  type="number"
                  value={newItem.minStockLevel || 0}
                  onChange={(e) => setNewItem({...newItem, minStockLevel: parseInt(e.target.value) || 0})}
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

        {/* Content */}
        {items.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full relative">
                    <div className="absolute top-1 left-1 w-4 h-4 bg-green-600 rounded-full"></div>
                    <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Inventory Added</h2>
            <p className="text-gray-600 mb-8">
              You don&apos;t have any items in your Inventory, Click on &quot;Add Inventory&quot; to get started
            </p>
          </div>
        ) : (
          // Table View
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableHeader field="id">Item ID</SortableHeader>
                  <SortableHeader field="itemName">Item Name</SortableHeader>
                  <SortableHeader field="category">Category</SortableHeader>
                  <SortableHeader field="unitOfMeasure">Unit of Measure</SortableHeader>
                  <SortableHeader field="currentStockLevel">Current Stock Level</SortableHeader>
                  <SortableHeader field="minStockLevel">Min Stock Level</SortableHeader>
                  <SortableHeader field="lastUpdate">Last Update</SortableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unitOfMeasure}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.currentStockLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.minStockLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Floating Add Button (when table has items) */}
        {items.length > 0 && (
          <button
            onClick={() => setShowAddForm(true)}
            className="fixed bottom-8 right-8 w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
