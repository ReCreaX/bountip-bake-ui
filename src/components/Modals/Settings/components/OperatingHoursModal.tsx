import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { ChevronDown, ChevronUp } from "lucide-react";
import SettingFiles from "@/assets/icons/settings";

interface OperatingHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Location {
  id: string;
  name: string;
  address: string;
  expanded: boolean;
}

interface DayHours {
  day: string;
  enabled: boolean;
  openTime: string;
  closeTime: string;
}

export const OperatingHoursModal: React.FC<OperatingHoursModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      name: "Lagos, Nigeria",
      address: "652 C.Preston Rd, Inglewood, Maine 58530",
      expanded: true,
    },
    {
      id: "2",
      name: "Abuja, Nigeria",
      address: "2464 Royal Ln, Mesa, New Jersey 45463",
      expanded: false,
    },
  ]);

  const [operatingHours, setOperatingHours] = useState<
    Record<string, DayHours[]>
  >({
    "1": [
      { day: "Sunday", enabled: false, openTime: "00:00", closeTime: "00:00" },
      { day: "Monday", enabled: false, openTime: "00:00", closeTime: "00:00" },
      { day: "Tuesday", enabled: false, openTime: "00:00", closeTime: "00:00" },
      {
        day: "Wednesday",
        enabled: false,
        openTime: "00:00",
        closeTime: "00:00",
      },
      {
        day: "Thursday",
        enabled: false,
        openTime: "00:00",
        closeTime: "00:00",
      },
      { day: "Friday", enabled: false, openTime: "00:00", closeTime: "00:00" },
      {
        day: "Saturday",
        enabled: false,
        openTime: "00:00",
        closeTime: "00:00",
      },
    ],
    "2": [
      { day: "Sunday", enabled: false, openTime: "00:00", closeTime: "00:00" },
      { day: "Monday", enabled: false, openTime: "00:00", closeTime: "00:00" },
      { day: "Tuesday", enabled: false, openTime: "00:00", closeTime: "00:00" },
      {
        day: "Wednesday",
        enabled: false,
        openTime: "00:00",
        closeTime: "00:00",
      },
      {
        day: "Thursday",
        enabled: false,
        openTime: "00:00",
        closeTime: "00:00",
      },
      { day: "Friday", enabled: false, openTime: "00:00", closeTime: "00:00" },
      {
        day: "Saturday",
        enabled: false,
        openTime: "00:00",
        closeTime: "00:00",
      },
    ],
  });

  const toggleLocation = (locationId: string) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === locationId ? { ...loc, expanded: !loc.expanded } : loc
      )
    );
  };

  const handleDayToggle = (locationId: string, dayIndex: number) => {
    setOperatingHours((prev) => ({
      ...prev,
      [locationId]: prev[locationId].map((day, index) =>
        index === dayIndex ? { ...day, enabled: !day.enabled } : day
      ),
    }));
  };

  const handleTimeChange = (
    locationId: string,
    dayIndex: number,
    field: "openTime" | "closeTime",
    value: string
  ) => {
    setOperatingHours((prev) => ({
      ...prev,
      [locationId]: prev[locationId].map((day, index) =>
        index === dayIndex ? { ...day, [field]: value } : day
      ),
    }));
  };

  const handleSubmit = () => {
    // Handle save logic here
    console.log("Operating hours saved:", operatingHours);
    onClose();
  };

  return (
    <Modal
      image={SettingFiles.OperatingHours}
      isOpen={isOpen}
      onClose={onClose}
      title="Operating Hours"
      subtitle="Setup your Operating hours for all locations"
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {locations.map((location) => (
          <div key={location.id} className="border border-gray-200 rounded-lg">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleLocation(location.id)}
            >
              <div>
                <h3 className="font-semibold text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.address}</p>
              </div>
              {location.expanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {location.expanded && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="space-y-3 mt-4">
                  {operatingHours[location.id]?.map((dayHours, dayIndex) => (
                    <div key={dayHours.day} className="flex items-center gap-4">
                      <div className="flex items-center gap-3 w-24">
                        <input
                          type="checkbox"
                          id={`${location.id}-${dayHours.day}`}
                          checked={dayHours.enabled}
                          onChange={() =>
                            handleDayToggle(location.id, dayIndex)
                          }
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label
                          htmlFor={`${location.id}-${dayHours.day}`}
                          className="text-sm font-medium text-gray-700 min-w-[70px]"
                        >
                          {dayHours.day}
                        </label>
                      </div>

                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">From</span>
                          <input
                            type="time"
                            value={dayHours.openTime}
                            onChange={(e) =>
                              handleTimeChange(
                                location.id,
                                dayIndex,
                                "openTime",
                                e.target.value
                              )
                            }
                            disabled={!dayHours.enabled}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">To</span>
                          <input
                            type="time"
                            value={dayHours.closeTime}
                            onChange={(e) =>
                              handleTimeChange(
                                location.id,
                                dayIndex,
                                "closeTime",
                                e.target.value
                              )
                            }
                            disabled={!dayHours.enabled}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <Button type="button" onClick={onClose} className="px-6">
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="px-6 bg-green-600 hover:bg-green-700 text-white"
        >
          Save Operating Hours
        </Button>
      </div>
    </Modal>
  );
};
