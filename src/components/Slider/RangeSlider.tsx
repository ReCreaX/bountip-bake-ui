"use client";

import React, { useEffect, useRef } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  minValue?: number;
  maxValue?: number;
  singleValue?: number;
  onChange: (minOrValue: number, maxValue?: number) => void;
  showLabels?: boolean;
  formatLabel?: (value: number) => string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  minValue,
  maxValue,
  singleValue,
  onChange,
  showLabels = true,
  formatLabel = (val) => `$${val.toLocaleString()}`,
}) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const singleRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (singleValue !== undefined && singleRef.current) {
      onChange(parseInt(singleRef.current.value));
    } else if (minRef.current && maxRef.current) {
      const minVal = parseInt(minRef.current.value);
      const maxVal = parseInt(maxRef.current.value);
      if (minVal <= maxVal) {
        onChange(minVal, maxVal);
      }
    }
  };

  useEffect(() => {
    if (singleValue !== undefined && singleRef.current) {
      singleRef.current.value = singleValue.toString();
    }
    if (minRef.current) minRef.current.value = minValue?.toString() || "0";
    if (maxRef.current) maxRef.current.value = maxValue?.toString() || "0";
  }, [singleValue, minValue, maxValue]);

  // Render Single or Range Slider
  return (
    <div className="space-y-2">
      {singleValue !== undefined ? (
        <>
          <input
            type="range"
            ref={singleRef}
            min={min}
            max={max}
            step={step}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                (singleValue / max) * 100
              }%, #e5e7eb ${(singleValue / max) * 100}%, #e5e7eb 100%)`,
            }}
          />
          {showLabels && (
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{formatLabel(min)}</span>
              <span>{formatLabel(max)}</span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="relative h-10">
            <input
              type="range"
              ref={minRef}
              defaultValue={minValue}
              min={min}
              max={max}
              step={step}
              onChange={handleChange}
              className="absolute w-full appearance-none h-1 bg-transparent z-10"
              style={{ zIndex: minValue && minValue > max - 100 ? 5 : undefined }}
            />
            <input
              type="range"
              ref={maxRef}
              defaultValue={maxValue}
              min={min}
              max={max}
              step={step}
              onChange={handleChange}
              className="absolute w-full appearance-none h-1 bg-transparent z-20"
            />
            <div className="relative w-full h-1 bg-gray-200 rounded">
              <div
                className="absolute h-1 bg-green-500 rounded"
                style={{
                  left: `${((minValue ?? 0) / max) * 100}%`,
                  width: `${(((maxValue ?? 0) - (minValue ?? 0)) / max) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          {showLabels && (
            <div className="flex justify-between text-xs text-gray-600">
              <span>{formatLabel(minValue ?? min)}</span>
              <span>{formatLabel(maxValue ?? max)}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RangeSlider;
