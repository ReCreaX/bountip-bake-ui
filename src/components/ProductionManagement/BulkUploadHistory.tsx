import {
  ArrowLeft,
  CloudUpload,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import ProductFilters from "./ProductFilters";

interface BulkUploadHistoryProps {
  onClose: () => void;
  isOpen: boolean;
}

const BulkUploadHistory: React.FC<BulkUploadHistoryProps> = ({
  onClose,
  
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  return (
    <section className="">
      <div className="flex items-center gap-2 my-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-white h-[50px] w-[50px] flex items-center  justify-center rounded-full"
        >
          <ArrowLeft className="w-[16px]" />
        </button>
        <h3 className="">Bulk Upload History</h3>
      </div>
      <div className="bg-white ">
        <div className="flex items-center justify-between  my-2 py-3 px-4">
          <h3 className="text-[20px] text-[#1C1B20]">All Uploads</h3>
          <div className="flex items-center gap-3.5">
            <div className="relative border   rounded-[10px] border-[#E7E7E7] flex ">
              <input
                placeholder="Search by Product name, category...."
                type="text"
                name="searchProduct"
                id="searchProduct"
                className="outline-none border-none text-sm px-3.5"
              />
              <button
                className="bg-[#15BA5C] h-[38px] rounded-tr-[10px] rounded-br-[10px] px-2.5"
                type="button"
              >
                <Search className="h-[20px] text-white" />
              </button>
            </div>
            <div className="relative">
              <button
                className=" border border-[#E7E7E7] px-2.5 py-2 flex items-center rounded-[10px] gap-2.5"
                type="button"
                onClick={() => setShowFilter(!showFilter)}
              >
                <span className="text-base">Filters</span>
                <SlidersHorizontal className="h-[16px]" />
              </button>
              {showFilter && (
                <div className="absolute w-[360px] top-9 -right-4 bg-white z-10 p-4 shadow-md rounded-lg">
                  <ProductFilters />
                </div>
              )}
            </div>
            <button className="flex items-center gap-1.5 bg-[#15BA5C] text-white px-2.5 py-2.5 rounded-[12px]" type="button">
              <CloudUpload className="h-[17px]" />
              <span className="text-[15px]">Upload</span>
            </button>
          </div>
        </div>
        <FileListTable />
      </div>
    </section>
  );
};

export default BulkUploadHistory;

const FileListTable: React.FC = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      fileName: "Product_list_First Draft.xlsx",
      dateUploaded: "24/06/2025; 1:46 PM",
      size: "2.5 Mb",
      name: "Leslie Alexander",
    },
    {
      id: 2,
      fileName: "Product_list_First Draft.xlsx",
      dateUploaded: "25/06/2025; 3:46 PM",
      size: "2.5 Mb",
      name: "Annette Black",
    },
    {
      id: 3,
      fileName: "Product_list_First Draft.xlsx",
      dateUploaded: "26/06/2025; 8:43 PM",
      size: "2.5 Mb",
      name: "Floyd Miles",
    },
    {
      id: 4,
      fileName: "Product_list_First Draft.xlsx",
      dateUploaded: "27/06/2025; 2:46 PM",
      size: "2.5 Mb",
      name: "Eleanor Pena",
    },
    {
      id: 5,
      fileName: "Product_list_First Draft.xlsx",
      dateUploaded: "28/06/2025; 1:46 PM",
      size: "2.5 Mb",
      name: "Guy Hawkins",
    },
    {
      id: 6,
      fileName: "Product_list_First Draft.xlsx",
      dateUploaded: "24/06/2025; 1:46 PM",
      size: "2.5 Mb",
      name: "Savannah Nguyen",
    },
    {
      id: 7,
      fileName: "Product_list_First Draft.xlsx",
      dateUploaded: "24/06/2025; 1:46 PM",
      size: "2.5 Mb",
      name: "Darlene Robertson",
    },
  ]);

  const handleDelete = (id: number) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="w-full bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time Uploaded
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.map((file) => (
            <tr key={file.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-900">{file.fileName}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {file.dateUploaded}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {file.size}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {file.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => handleDelete(file.id)}
                  className="inline-flex items-center px-3 py-1 border border-red-300 text-red-700 bg-white rounded hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
