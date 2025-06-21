import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-10 h-6 rounded-full transition-colors ${
            checked ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform mt-1 ${
              checked ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </div>
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
      )}
    </label>
  );
};
