"use client";
import { useState } from "react";
import InventoryList from "./InventoryList";

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

      <div className="bg-white p-6">
        {activeTab === "Inventory Items" ? (
          <InventoryList />
        ) : (
          <p className="text-gray-500 text-sm">Coming soon: {activeTab}</p>
        )}
      </div>
    </div>
  );
}
