"use client";
import AssetsFiles from "@/assets";
import { useModalStore } from "@/stores/useUIStore";
import { UserType } from "@/types/userTypes";
import { COOKIE_NAMES, getCookie } from "@/utils/cookiesUtils";
import { Bell, ChevronDown, ChevronsLeftRight, Search } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const { setShowFullDashboardSidebar, showFullDashboardSidebar } =
    useModalStore();

  // const user = getCookie<UserType>("bountipLoginUser");
  const user = getCookie<UserType>(COOKIE_NAMES.BOUNTIP_LOGIN_USER);
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <section className="flex items-center gap-4">
        <Image src={AssetsFiles.LogoTwo} alt="Logo" className="w-[100px]" />
        <button className="bg-[#FBFBFB] border-[#C1C1C1] border" type="button">
          <ChevronsLeftRight
            onClick={() => {
              setShowFullDashboardSidebar(!showFullDashboardSidebar);
            }}
            className="text-[#1C1B20] font-light"
          />
        </button>
      </section>
      <section className="relative border border-[#E7E7E7] rounded-2xl py-3 pl-11 pr-6 w-1/3">
        <Search className="absolute left-1.5" />
        <input
          type="text"
          placeholder="Search for anything..."
          className="outline-none border-none"
          name=""
          id=""
        />
      </section>
      <section className="flex items-center gap-3.5">
        <div className="shadow-md rounded-full p-2.5  bg-white flex items-center gap-3 relative">
          <span className="absolute -top-2.5 right-1.5 bg-red-500 text-white text-[10px] px-1 py-1 rounded-full">
            16
          </span>
          <Bell className="text-[13px]" />
        </div>
        <div className="flex items-center gap-2.5">
          <Image
            src={AssetsFiles.UserPerson}
            className="h-[40px] w-[40px] rounded-full"
            alt="User"
          />
          <div className="flex gap-2.5">
            <h3 className="text-nowrap">{user?.fullName}</h3>
            <ChevronDown />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
