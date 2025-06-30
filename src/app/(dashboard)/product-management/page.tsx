"use client";
import AssetsFiles from "@/assets";
import { Switch } from "@/components/Modals/Settings/ui/Switch";
import BulkUploadHistory from "@/components/ProductionManagement/BulkUploadHistory";
//import CreateProductModals from "@/components/ProductionManagement/CreateProductModals";
import EditProductModals from "@/components/ProductionManagement/EditProductModal";
import ProductCatalog from "@/components/ProductionManagement/ProductCatalog";
import ProductCatalogGrid from "@/components/ProductionManagement/ProductCatalogGrid";
import ProductFilters from "@/components/ProductionManagement/ProductFilters";
import UploadCsvModal from "@/components/ProductionManagement/UploadCsvModal";
import {
  Clock3,
  CloudUpload,
  LayoutGrid,
  List,
  Plus,
  Search,
  Share2,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProductionManagement = () => {
  const [selectedView, setSelectedView] = useState<"list" | "card">("list");
  const [hideImages, setHideImages] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showBulkUpload, setShowBulkUpload] = useState<boolean>(false);
  const [showUploadCSV, setshowUploadCSV] = useState<boolean>(false);
  const [showBulkUploadHistory, setShowBulkUploadHistory] =
    useState<boolean>(false);

  const [showCreateProductModal, setShowCreateProductModal] =
    useState<boolean>(false);

  return (
    <section className="mx-3.5 my-[20px] ">
      {showBulkUploadHistory ? (
        <BulkUploadHistory
          isOpen={showBulkUploadHistory}
          onClose={() => setShowBulkUploadHistory(false)}
        />
      ) : (
        <>
          <div className="flex items-center justify-between gap-8 my-2.5">
            <div className="flex items-center gap-2">
              <div className="bg-[#15BA5C] flex items-center justify-center w-[58px] h-[58px] rounded-full">
                <Image
                  src={AssetsFiles.ProductionManagementIcon}
                  alt="Production Management"
                  className="h-[28px] w-[28px]"
                />
              </div>

              <div className="text-[#1C1B20]">
                <h3 className="font-bold text-xl">Product Management</h3>
                <p className="text-[#737373] text-[15px]">
                  Create, organize, and manage all your bakery products in one
                  place
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  className=" flex items-center bg-white border border-[#15BA5C] px-4 py-2 rounded-xl"
                  type="button"
                  onClick={() => setShowBulkUpload(!showBulkUpload)}
                >
                  <CloudUpload className="text-[#15BA5C] text-[15px]" />
                  <span className="text-[#15BA5C] font-normal text-[14px] ml-2 text-nowrap">
                    Bulk Upload
                  </span>
                </button>
                {showBulkUpload && (
                  <div className="absolute  top-12 -right-4 bg-[#1C1B20]  z-10  shadow-md rounded-lg">
                    <button
                      className="w-full flex items-center text-[#15BA5C] px-1 py-2.5"
                      type="button"
                      onClick={() => setshowUploadCSV(!showUploadCSV)}
                    >
                      <CloudUpload className="h-[15px]" />
                      <span className=" font-normal text-[14px] ml-2 text-nowrap">
                        Upload CSV
                      </span>
                    </button>
                    <hr className="text-[#898989]" />
                    <button
                      className="flex items-center text-[#15BA5C] px-1 py-2.5"
                      type="button"
                      onClick={() => setShowBulkUploadHistory(true)}
                    >
                      <Clock3 className="h-[15px]" />
                      <span className=" font-normal text-[14px] ml-2 text-nowrap">
                        View Upload History
                      </span>
                    </button>
                  </div>
                )}
              </div>
              <button
                className="flex items-center bg-white border border-[#15BA5C] px-4 py-2 rounded-xl"
                type="button"
              >
                <Share2 className="text-[#15BA5C] text-[15px]" />
                <span className="text-[#15BA5C] font-normal text-[14px] ml-2 text-nowrap">
                  Export
                </span>
              </button>

              <button
                className="flex items-center text-white  px-4 py-2 rounded-xl bg-[#15BA5C]"
                type="button"
                onClick={() => setShowCreateProductModal(true)}
              >
                <Plus className=" text-[15px]" />
                <span className=" font-normal text-[14px] ml-2 text-nowrap">
                  Create a Product
                </span>
              </button>
            </div>
          </div>
          <div className="bg-white flex flex-col gap-3.5 shadow-md rounded-[10px] my-2 ">
            <div className="text-[#1C1B20] flex items-center justify-between gap-4 p-4">
              <h3 className="font-normal text-[18px]">All Products</h3>
              <div className="flex items-center gap-4">
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

                {selectedView === "card" && (
                  <button
                    className="border border-[#E7E7E7] px-2.5 py-2 flex items-center rounded-[10px] gap-2.5"
                    type="button"
                  >
                    <span className="text-base">Hide Images</span>
                    <Switch checked={hideImages} onChange={setHideImages} />
                  </button>
                )}
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

                <div className="bg-[#FAFAFC] border border-[#E6E6E6] rounded-md flex items-center gap-3.5 p-1">
                  <button
                    type="button"
                    onClick={() => setSelectedView("list")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                      selectedView === "list" ? "bg-white" : "bg-transparent"
                    }`}
                  >
                    <List className="h-[16px]" />
                    <span>Lists</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedView("card")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                      selectedView === "card" ? "bg-white" : "bg-transparent"
                    }`}
                  >
                    <LayoutGrid className="h-[16px]" />
                    <span>Card View</span>
                  </button>
                </div>
              </div>
            </div>
            {selectedView === "list" ? (
              <ProductCatalog />
            ) : (
              <ProductCatalogGrid hideImages={hideImages} />
            )}
          </div>
          {/* Create and Edit Product Modal */}
          {showCreateProductModal && (
            <EditProductModals
              onClose={() => setShowCreateProductModal(false)}
              isOpen={showCreateProductModal}
              size="md" // You can adjust the size as needed
            />
          )}
          {/* {showCreateProductModal && (
          <CreateProductModals
            onClose={() => setShowCreateProductModal(false)}
            isOpen={showCreateProductModal}
            size="md" // You can adjust the size as needed
          />
        )} */}
          <UploadCsvModal
            isOpen={showUploadCSV}
            onClose={() => setshowUploadCSV(false)}
            size="md"
          />
        </>
      )}
    </section>
  );
};

export default ProductionManagement;
