import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string;
  placeholder?: string;
  label?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  placeholder = "Select an option",
  label,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm(""); // Clear search on close
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    setSearchTerm(""); // Clear search on select
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full  border-2 border-[#E6E6E6]  rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer   sm:text-sm transition-colors"
      >
        <span className="block truncate text-gray-900">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute border border-[#E6E6E6] z-10 mt-1 w-full bg-[#FAFAFC] shadow-lg  rounded-md py-1 text-base    focus:outline-none sm:text-sm">
            <p className="px-3 py-2.5 text-[#1C1B20] font-medium">{label}</p>
          <div className="relative px-3 py-2 ">
            <Search className="absolute left-4 top-4 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              className="pl-9 pr-2 py-1.5 w-full rounded  text-sm bg-white outline-none border border-[#E6E6E6]"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors ${
                  selectedValue === option.value
                    ? "text-[#15BA5C] "
                    : "text-gray-900"
                }`}
              >
                <span className="block truncate">{option.label}</span>
                {selectedValue === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Check className="h-4 w-4 " />
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
