import React, { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import SettingFiles from "@/assets/icons/settings";
import { Switch } from "../ui/Switch";
import settingsService from "@/services/settingsService";
import { OperatingHoursType } from "@/types/settingTypes";
import { toast } from "sonner";
import { ApiResponseType } from "@/types/httpTypes";
import { businessService } from "@/services/businessService";
import { COOKIE_NAMES } from "@/utils/cookiesUtils";

interface OperatingHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string | number | null;
  outletId: string | number | null;
  outletsData:any[];
  businessData:any[];
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
outletsData,
businessData,
businessId,
  outletId,
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
useEffect(() => {
  // const fetchBusiness = async () => {
  //   try {
  //     const res = (await businessService.getUserBusiness(
  //       COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
  //     )) as ApiResponseType;

  //     console.log("This is the business response:", res);

  //     if ("error" in res || !res.status) {
  //       console.warn("Failed to fetch business:", res);
  //       return;
  //     }

  //     const businessData = res?.data.data;
  //     setBusinessLocationsData(businessData);
  //   } catch (err) {
  //     console.error("Unexpected error while fetching business:", err);
  //   }
  // };

  // fetchBusiness();
}, []);

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
    //console.log(businessData, outletsData)
    if (!outletId || !businessId) {
      console.error("Outlet ID is missing.");
      return;
    }

    const locationData = operatingHours[1];

    if (!locationData) {
      console.error("No operating hours for this outlet.");
      return;
    }

    const dto: Partial<OperatingHoursType> = {};

    locationData.forEach(({ day, enabled, openTime, closeTime }) => {
      const key = day.toLowerCase() as keyof OperatingHoursType;
      dto[key] = {
        open: openTime,
        close: closeTime,
        isActive: enabled,
      };
    });

    const isComplete =
      Object.keys(dto).length === 7 &&
      Object.keys(dto).every((day) => !!dto[day as keyof OperatingHoursType]);

    if (!isComplete) {
      console.error("DTO is missing one or more days.");
      return;
    }

    try {
      const result = (await settingsService.updateOperatingHours(
        businessId as string,
        dto as OperatingHoursType
      )) as ApiResponseType;
      if (result.status) {
        toast.success("Operating hours updated successfully", {
          duration: 3000,
        });
      }
    } catch (err) {
      toast.error("Failed to update operating hours", {
        duration: 3000,
        position: "top-right",
        style: { backgroundColor: "#f87171", color: "#fff" },
      });
      console.error("Error:", err);
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      image={SettingFiles.OperatingHours}
      isOpen={isOpen}
      onClose={onClose}
      title="Operating Hours"
      subtitle="Setup your Operating hours for all locations"
    >
      <>
        <div className="space-y-4  overflow-y-auto">
        {/* {console.log(businessData)}
        {console.log(outletsData)} */}
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
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="space-y-3 mt-4">
                    {operatingHours[location.id]?.map((dayHours, dayIndex) => (
                      <div
                        key={dayHours.day}
                        className="flex items-center gap-4"
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

                        <div className="flex items-center gap-2 flex-1">
                          <div className="flex items-center gap-2 border border-[#E6E6E6] px-2 rounded-xl">
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
                              className="px-3 py-2  rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                            />
                          </div>

                          <div className="flex items-center gap-2 border border-[#E6E6E6] px-2 rounded-xl">
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
                              className="px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
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
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
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
