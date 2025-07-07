import React, { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import SettingFiles from "@/assets/icons/settings";
import { Switch } from "../ui/Switch";
import settingsService from "@/services/settingsService";
import { OperatingHoursType } from "@/types/settingTypes";
import { toast } from "sonner";
import { ApiResponseType } from "@/types/httpTypes";
import { useBusiness } from "@/hooks/useBusiness";

interface OperatingHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outletsData: any[];
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

// Custom TimeInput component
const TimeInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}> = ({ value, onChange, disabled = false, placeholder = "00:00" }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const formatTime = (input: string): string => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) {
      const hours = digits.slice(0, 2);
      const minutes = digits.slice(2);
      return `${hours}:${minutes}`;
    }
    
    // Limit to 4 digits max
    const hours = digits.slice(0, 2);
    const minutes = digits.slice(2, 4);
    return `${hours}:${minutes}`;
  };

  const validateTime = (timeString: string): boolean => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return timeRegex.test(timeString);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTime(e.target.value);
    setInputValue(formatted);
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setInputValue('00:00');
      onChange('00:00');
      return;
    }

    // Pad incomplete times
    if (inputValue.length === 1) {
      const padded = `0${inputValue}:00`;
      setInputValue(padded);
      onChange(padded);
    } else if (inputValue.length === 2) {
      const padded = `${inputValue}:00`;
      setInputValue(padded);
      onChange(padded);
    } else if (inputValue.length === 4 && inputValue.includes(':')) {
      const [hours, minutes] = inputValue.split(':');
      const padded = `${hours.padStart(2, '0')}:${minutes.padEnd(2, '0')}`;
      setInputValue(padded);
      onChange(padded);
    } else if (validateTime(inputValue)) {
      onChange(inputValue);
    } else {
      // Reset to previous valid value if invalid
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, and arrow keys
    if ([8, 9, 27, 13, 37, 38, 39, 40, 46].includes(e.keyCode) ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey) ||
        (e.keyCode === 67 && e.ctrlKey) ||
        (e.keyCode === 86 && e.ctrlKey) ||
        (e.keyCode === 88 && e.ctrlKey)) {
      return;
    }
    // Ensure that it's a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder={placeholder}
      maxLength={5}
      className="px-3 outline-none py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 text-center min-w-[80px]"
    />
  );
};

export const OperatingHoursModal: React.FC<OperatingHoursModalProps> = ({
  isOpen,
  onClose,
  outletsData,

}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectAllMap, setSelectAllMap] = useState<Record<string, boolean>>({});

    const business = useBusiness();
    const businessId = business?.id;

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
  
  useEffect(() => {
    if (!outletsData || outletsData.length === 0) return;

    const newLocations = outletsData.map((item) => ({
      id: String(item.outlet.id),
      name: item.outlet.name || "Unnamed Outlet",
      address: item.outlet.address || "No address provided",
      expanded: true,
    }));

    setLocations(newLocations);

    const initialOperatingHours: Record<string, DayHours[]> = {};

    newLocations.forEach((loc) => {
      const rawHours = outletsData.find((o) => String(o.outlet.id) === loc.id)
        ?.outlet.operatingHours;

      const defaultDayHours = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ].map((day) => ({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        enabled: rawHours?.[day]?.isActive || false,
        openTime: rawHours?.[day]?.open || "00:00",
        closeTime: rawHours?.[day]?.close || "00:00",
      }));

      initialOperatingHours[loc.id] = defaultDayHours;
    });

    setOperatingHours(initialOperatingHours);
  }, [outletsData]);

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

  const handleSubmit = async () => {
    if (!businessId) {
      console.error("Business ID is missing.");
      return;
    }

    const updatePromises = Object.entries(operatingHours).map(
      async ([outletId, dayHours]) => {
        const dto: Partial<OperatingHoursType> = {};

        dayHours.forEach(({ day, enabled, openTime, closeTime }) => {
          const key = day.toLowerCase() as keyof OperatingHoursType;
          dto[key] = {
            open: openTime,
            close: closeTime,
            isActive: enabled,
          };
        });

        const isComplete =
          Object.keys(dto).length === 7 &&
          Object.keys(dto).every(
            (day) => !!dto[day as keyof OperatingHoursType]
          );

        if (!isComplete) {
          console.warn(`Skipping outlet ${outletId}: incomplete data.`);
          return Promise.resolve({
            outletId,
            success: false,
            error: "Incomplete data",
          });
        }

        try {
          const result = (await settingsService.updateOperatingHours(
            outletId,
            dto as OperatingHoursType
          )) as ApiResponseType;
          if (result.status) {
            return { outletId, success: true };
          } else {
            throw new Error("API call failed");
          }
        } catch (error) {
          console.error(`Failed to update outlet ${outletId}:`, error);
          return { outletId, success: false, error };
        }
      }
    );

    const results = await Promise.all(updatePromises);

    const successes = results.filter((r) => r.success).length;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const failures = results.filter((r) => !r.success);

    onClose();
    toast.success(`${successes} outlet(s) updated successfully`, {
      duration: 3000,
    });
  };

  return (
    <Modal
      size={"lg"}
      image={SettingFiles.OperatingHours}
      isOpen={isOpen}
      onClose={onClose}
      title="Operating Hours"
      subtitle="Setup your Operating hours for all locations"
    >
      <>
        <div className="space-y-4 overflow-y-auto">
          {locations.map((location) => (
            <div
              key={location.id}
              className="border border-gray-200 rounded-lg"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleLocation(location.id)}
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-600">{location.address}</p>
                </div>
                {location.expanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>

              {location.expanded && (
                <div className="px-4 pb-4 border-t border-gray-100 flex flex-col gap-10">
                  {operatingHours[location.id]?.map((dayHours, dayIndex) => (
                    <div
                      key={dayHours.day}
                      className="flex items-center justify-between gap-4 relative mt-2.5"
                    >
                      <div className="w-32">
                        <Switch
                          checked={dayHours.enabled}
                          onChange={() =>
                            handleDayToggle(location.id, dayIndex)
                          }
                          label={dayHours.day}
                        />
                      </div>

                      <div className="flex items-center gap-2 flex-1 relative">
                        <div className="flex flex-1/2 items-center justify-between gap-2 border border-[#E6E6E6] px-2 rounded-xl">
                          <span className="text-sm text-gray-600">From</span>
                          <TimeInput
                            value={dayHours.openTime}
                            onChange={(value) =>
                              handleTimeChange(
                                location.id,
                                dayIndex,
                                "openTime",
                                value
                              )
                            }
                            disabled={!dayHours.enabled}
                            placeholder="09:00"
                          />
                        </div>

                        <div className="flex flex-1/2 items-center justify-between gap-2 border border-[#E6E6E6] px-2 rounded-xl">
                          <span className="text-sm text-gray-600">To</span>
                          <TimeInput
                            value={dayHours.closeTime}
                            onChange={(value) =>
                              handleTimeChange(
                                location.id,
                                dayIndex,
                                "closeTime",
                                value
                              )
                            }
                            disabled={!dayHours.enabled}
                            placeholder="17:00"
                          />
                        </div>

                        {dayIndex === 0 && (
                          <div className="flex items-center gap-2.5 absolute -bottom-6 left-0">
                            <input
                              type="checkbox"
                              className="accent-green-600"
                              checked={!!selectAllMap[location.id]}
                              onChange={(e) => {
                                const isChecked = e.target.checked;

                                setSelectAllMap((prev) => ({
                                  ...prev,
                                  [location.id]: isChecked,
                                }));

                                setOperatingHours((prev) => ({
                                  ...prev,
                                  [location.id]: prev[location.id].map(
                                    (day) => ({
                                      ...day,
                                      enabled: isChecked,
                                    })
                                  ),
                                }));
                              }}
                            />

                            <p className="text-[#1C1B20] text-sm">
                              Apply to all
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              onClick={() => handleSubmit()}
              className="flex items-center justify-center gap-2 bg-[#15BA5C] w-full text-[#ffffff] py-3 rounded-[10px] font-medium text-base mt-5"
              type="button"
            >
              <Check className="text-[14px]" />
              <span className=""> Save Operating Hours</span>
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};