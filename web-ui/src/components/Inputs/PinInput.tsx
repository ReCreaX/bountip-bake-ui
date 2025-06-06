"use client";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const PinInput = () => {
  const [localPin, setLocalPin] = useState<string[]>([]);
  const setPin = useAuthStore((s) => s.setPin);

  const handleClick = (value: string) => {
    if (localPin.length < 4) {
      const updated = [...localPin, value];
      setLocalPin(updated);
      setPin(updated.join(""));
    }
  };

  const handleDelete = () => {
    const updated = localPin.slice(0, -1);
    setLocalPin(updated);
    setPin(updated.join(""));
  };

  return (
    <div className=" mt-10">
      <div className="flex justify-center space-x-2 mb-6">
        {[0, 1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < localPin.length ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"].map((btn, idx) => (
          <button
            key={idx}
            className="bg-gray-100 hover:bg-gray-200 text-lg p-4 rounded-lg shadow"
            onClick={() => (btn === "del" ? handleDelete() : handleClick(btn))}
          >
            {btn === "del" ? "⌫" : btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PinInput;
