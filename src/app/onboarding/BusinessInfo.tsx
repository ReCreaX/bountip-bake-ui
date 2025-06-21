import { useState } from "react";
import { ChevronDown, Plus, X, Check } from "lucide-react";
import BusinessRevenueComponent from "./BusinessRevenueComponent";

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "UK", name: "United Kingdom" },
  { code: "NG", name: "Nigeria" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "JP", name: "Japan" },
];

const defaultBusinessTypes = ["Bakery", "Restaurant", "Bar"];
const BusinessInfo = () => {
  const [businessType, setBusinessType] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessTypes, setBusinessTypes] = useState(defaultBusinessTypes);
  const [isBusinessTypeOpen, setIsBusinessTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [newBusinessType, setNewBusinessType] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [revenue, setRevenue] = useState(50000);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleAddBusinessType = () => {
    if (
      newBusinessType.trim() &&
      !businessTypes.includes(newBusinessType.trim())
    ) {
      const updatedTypes = [...businessTypes, newBusinessType.trim()];
      setBusinessTypes(updatedTypes);
      setBusinessType(newBusinessType.trim());
      setNewBusinessType("");
      setIsAddingNew(false);
      setIsBusinessTypeOpen(false);
    }
  };



  const handleBusinessTypeSelect = (type: string) => {
    setBusinessType(type);
    setIsBusinessTypeOpen(false);
  };

  const handleLocationSelect = (country: { code: string; name: string }) => {
    setBusinessLocation(country.name);
    setIsLocationOpen(false);
  };

  const handleBusinessOnboardingSubmission = async()=>{
    if (!businessType || !businessLocation) {
      alert("Please select business type and location");
      return;
    }
    const formData = new FormData();
    formData.append("businessType", businessType);
    formData.append("businessLocation", businessLocation);
    formData.append("revenue", revenue.toString());
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      const response = await fetch("/api/onboarding/business", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to submit business onboarding data");
      }
      alert("Business onboarding submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting your business information.");
    }
  }
  return (
    <>
      <h3 className="text-[#1E1E1E] text-[26px] font-bold mt-6 mb-4 text-center">
        Tell us About your <span className="text-[#15BA5C]">Business</span>
      </h3>
      <form>
        <div className="space-y-6">
          {/* Business Type Dropdown */}
          <div className="space-y-2">
            <h3 className="font-medium text-[18px] text-gray-700">
              What type of Business are you?
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsBusinessTypeOpen(!isBusinessTypeOpen);
                }}
                className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15BA5C] transition-colors"
              >
                <span
                  className={businessType ? "text-gray-900" : "text-gray-500"}
                >
                  {businessType || "Select your Business type"}
                </span>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </button>

              {isBusinessTypeOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="py-1">
                    {businessTypes.map((type, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBusinessTypeSelect(type);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group"
                      >
                        <span className="text-gray-900">{type}</span>
                        {businessType === type && (
                          <Check className="h-4 w-4 text-[#15BA5C]" />
                        )}
                      </button>
                    ))}

                    {!isAddingNew ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsAddingNew(true);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center text-[#15BA5C] font-medium"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Business
                      </button>
                    ) : (
                      <div className="px-4 py-2 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={newBusinessType}
                            onChange={(e) => setNewBusinessType(e.target.value)}
                            placeholder="Enter business type"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#15BA5C]"
                            autoFocus
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddBusinessType();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddBusinessType();
                            }}
                            className="p-2 bg-[#15BA5C] text-white rounded-md hover:bg-[#13A652] transition-colors"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsAddingNew(false);
                              setNewBusinessType("");
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Business Location Dropdown */}
          <div className="space-y-2 text-[#1E1E1E]">
            <h3 className="font-medium text-[18px] text-[#1E1E1E]">
              Where is your Business located?
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLocationOpen(!isLocationOpen);
                }}
                className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15BA5C] transition-colors"
              >
                <span
                  className={
                    businessLocation ? "text-gray-900" : "text-gray-500"
                  }
                >
                  {businessLocation || "Select your country"}
                </span>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </button>

              {isLocationOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="py-1">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLocationSelect(country);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group"
                      >
                        <span className="text-gray-900">{country.name}</span>
                        {businessLocation === country.name && (
                          <Check className="h-4 w-4 text-[#15BA5C]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-[18px] text-gray-700">
              What type of Business are you?
            </h3>
            <input
              type="text"
              name="businessAddress"
              id=""
              placeholder="Enter your Business address"
              autoFocus
              className="w-full text-[#1E1E1E] text-[15px] flex-1 px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#15BA5C]"
            />
          </div>
          <div className="w-full">
            <BusinessRevenueComponent
              onRevenueChange={setRevenue}
              onFileUpload={setLogoFile}
            />
          </div>

          {/* Continue Button */}
          <button
          onClick={handleBusinessOnboardingSubmission}
            type="submit"
            disabled={!businessType || !businessLocation}
            className="w-full mt-8 px-6 py-3 bg-[#15BA5C] text-white font-medium rounded-lg hover:bg-[#13A652] focus:outline-none focus:ring-2 focus:ring-[#15BA5C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default BusinessInfo;
