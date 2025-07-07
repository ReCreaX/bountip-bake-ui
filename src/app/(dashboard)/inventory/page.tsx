import AssetsFiles from "@/assets";
import InventoryNavigation from "@/components/Inventory/InventoryNavigation";
import { CloudUpload, MoveUpRight, Plus, Share2 } from "lucide-react";
import Image from "next/image";
import { PiTrashFill } from "react-icons/pi";

const InventoryPage = () => {
  return (
    <section className="mx-3.5 my-[20px]">
      <div className="flex items-center justify-between gap-8 my-2.5">
        <div className="flex items-center gap-2">
          {/* <div className="bg-[#15BA5C] flex items-center justify-center w-[58px] h-[58px] rounded-full">
            <Image
              src={AssetsFiles.ProductionManagementIcon}
              alt="Production Management"
              className="h-[28px] w-[28px]"
            />
          </div> */}

          <div className="text-[#1C1B20]">
            <h3 className="font-bold text-xl">Inventory Management</h3>
            <p className="text-[#737373] text-[15px]">
              Add, edit and manage your Inventory with ease{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative bulk-upload-dropdown">
            <button
              className="flex items-center bg-white border border-[#15BA5C] px-4 py-2 rounded-xl hover:bg-[#15BA5C] hover:text-white transition-colors group"
              type="button"
              // onClick={handleBulkUploadToggle}
              // aria-expanded={showBulkUpload}
              aria-haspopup="true"
            >
              <CloudUpload className="text-[#15BA5C] group-hover:text-white text-[15px]" />
              <span className="text-[#15BA5C] group-hover:text-white font-normal text-[14px] ml-2 text-nowrap">
                Bulk Upload
              </span>
            </button>
            {/* {showBulkUpload && (
                        <div className="absolute top-12 -right-4 bg-[#1C1B20] z-10 shadow-md rounded-lg min-w-[160px]">
                          <button
                            className="w-full flex items-center text-[#15BA5C] px-3 py-2.5 hover:bg-[#2C2B30] transition-colors"
                            type="button"
                            onClick={handleUploadCSV}
                          >
                            <CloudUpload className="h-[15px]" />
                            <span className="font-normal text-[14px] ml-2 text-nowrap">
                              Upload CSV
                            </span>
                          </button>
                          <hr className="border-[#898989]" />
                          <button
                            className="w-full flex items-center text-[#15BA5C] px-3 py-2.5 hover:bg-[#2C2B30] transition-colors"
                            type="button"
                            onClick={handleViewUploadHistory}
                          >
                            <Clock3 className="h-[15px]" />
                            <span className="font-normal text-[14px] ml-2 text-nowrap">
                              View Upload History
                            </span>
                          </button>
                        </div>
                      )} */}
          </div>

          <button
            className="flex items-center bg-white border border-[#15BA5C] px-4 py-2 rounded-xl hover:bg-[#15BA5C] hover:text-white transition-colors group"
            type="button"
          >
            <Share2 className="text-[#15BA5C] group-hover:text-white text-[15px]" />
            <span className="text-[#15BA5C] group-hover:text-white font-normal text-[14px] ml-2 text-nowrap">
              Export
            </span>
          </button>

          <button
            className="flex items-center text-white px-4 py-2 rounded-xl bg-[#15BA5C] hover:bg-[#129B4D] transition-colors"
            type="button"
          >
            <Plus className="text-[15px]" />
            <span className="font-normal text-[14px] ml-2 text-nowrap">
              Add Inventory Item
            </span>
          </button>
        </div>
      </div>
      <div className="my-2 grid grid-cols-5 gap-[10px] bg-[#FFFFFF] px-3.5 py-2.5">
        <div className="bg-[#15BA5C0D] py-[25px] px-3.5 rounded-[10px] relative">
          <div className="flex items-center gap-[11px] ">
            <div className="bg-[#15BA5C0D] px-2.5 rounded-lg py-2.5">
              <PiTrashFill className="text-[#15BA5C] text-[22px]" />
            </div>
            <h2 className="text-[20px] font-bold">150</h2>
          </div>
          <div className="absolute flex items-center rounded-full h-[30px] w-[30px] right-4 top-3 justify-center border border-[#15BA5C]">
            <MoveUpRight className="text-[#15BA5C] h-[16px] " />
          </div>

          <p className="text-[14px] font-normal pt-2.5"> Total No of Items</p>
        </div>

        <div className="bg-[#F8BD000D] py-[25px] px-3.5 rounded-[10px] relative">
          <div className="flex items-center gap-[11px] ">
            <div className="bg-[#15BA5C0D] px-2.5 rounded-lg py-2.5">
              <PiTrashFill className="text-[#F8BD00] text-[22px]" />
            </div>
            <h2 className="text-[20px] font-bold">150</h2>
          </div>
          <div className="absolute flex items-center rounded-full h-[30px] w-[30px] right-4 top-3 justify-center border border-[#F8BD00]">
            <MoveUpRight className="text-[#F8BD00] h-[16px] " />
          </div>

          <p className="text-[14px] font-normal pt-2.5"> Total No of Items</p>
        </div>

        <div className="bg-[#E336290D] py-[25px] px-3.5 rounded-[10px] relative">
          <div className="flex items-center gap-[11px] ">
            <div className="bg-[#15BA5C0D] px-2.5 rounded-lg py-2.5">
              <PiTrashFill className="text-[#E33629] text-[22px]" />
            </div>
            <h2 className="text-[20px] font-bold">150</h2>
          </div>
          <div className="absolute flex items-center rounded-full h-[30px] w-[30px] right-4 top-3 justify-center border border-[#E33629]">
            <MoveUpRight className="text-[#E33629] h-[16px] " />
          </div>

          <p className="text-[14px] font-normal pt-2.5"> Total No of Items</p>
        </div>

        <div className="bg-[#9747FF0D] py-[25px] px-3.5 rounded-[10px] relative">
          <div className="flex items-center gap-[11px] ">
            <div className="bg-[#15BA5C0D] px-2.5 rounded-lg py-2.5">
              <PiTrashFill className="text-[#9747FF] text-[22px]" />
            </div>
            <h2 className="text-[20px] font-bold">150</h2>
          </div>
          <div className="absolute flex items-center rounded-full h-[30px] w-[30px] right-4 top-3 justify-center border border-[#9747FF]">
            <MoveUpRight className="text-[#9747FF] h-[16px] " />
          </div>

          <p className="text-[14px] font-normal pt-2.5"> Total No of Items</p>
        </div>

        <div className="bg-[#73737314]  py-[25px] px-3.5 rounded-[10px] relative">
          <div className="flex items-center gap-[11px] ">
            <div className="bg-[#15BA5C0D] px-2.5 rounded-lg py-2.5">
              <PiTrashFill className="text-[#737373] text-[22px]" />
            </div>
            <h2 className="text-[20px] font-bold">150</h2>
          </div>
          <div className="absolute flex items-center rounded-full h-[30px] w-[30px] right-4 top-3 justify-center border border-[#737373]">
            <MoveUpRight className="text-[#737373] h-[16px] " />
          </div>

          <p className="text-[14px] font-normal pt-2.5"> Total No of Items</p>
        </div>
      </div>
      <InventoryNavigation/>
    </section>
  );
};

export default InventoryPage;



