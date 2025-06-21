import { Upload } from "lucide-react";
import { useRef, useState } from "react";

interface BusinessRevenueComponentProps {
    onRevenueChange?: (value: number) => void;
    onFileUpload?: (file: File) => void;
  }
  
  const BusinessRevenueComponent: React.FC<BusinessRevenueComponentProps> = ({
    onRevenueChange,
    onFileUpload,
  }) => {
    const [revenueValue, setRevenueValue] = useState<number>(50000);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value);
      setRevenueValue(value);
      onRevenueChange?.(value);
    };
  
    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };
  
    const handleFileSelect = (file: File) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "application/pdf",
      ];
      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file);
        onFileUpload?.(file);
      }
    };
  
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(true);
    };
  
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(false);
    };
  
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(false);
  
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    };
  
    const handleFileInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    };
  
    const handleUploadClick = () => {
      fileInputRef.current?.click();
    };
  
    return (
      <div className="w-full   bg-white">
        {/* Revenue Range Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Business Revenue Range
          </h3>
  
          <div className="relative  h-10">
            <h3
              className="absolute bottom-3  transform -translate-x-1/2 text-sm font-semibold text-emerald-600"
              style={{
                left: `calc(${(revenueValue / 1000000) * 100}% )`,
              }}
            >
              {formatCurrency(revenueValue)}
            </h3>
          </div>
  
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1000000"
              step="1000"
              value={revenueValue}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                  (revenueValue / 1000000) * 100
                }%, #e5e7eb ${(revenueValue / 1000000) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>$0</span>
              <span>$1M+</span>
            </div>
          </div>
        </div>
  
        {/* File Upload Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Upload your Business Logo
          </h3>
  
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragOver
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.svg,.pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
  
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
  
              {uploadedFile ? (
                <div className="text-center">
                  <p className="text-emerald-600 font-medium mb-1">
                    File uploaded successfully!
                  </p>
                  <p className="text-sm text-gray-600">{uploadedFile.name}</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-emerald-600 font-medium mb-1">
                    Click to upload or Drag your file here
                  </p>
                  <p className="text-sm text-gray-500">
                    Max file: 5mb, Png, jpg, svg, pdf
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
  
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #10b981;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #10b981;
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    );
  };
  
  export default BusinessRevenueComponent;