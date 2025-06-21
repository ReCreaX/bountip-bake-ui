"use client";

import { DashboardSidebarNavigationData } from "@/data/SidebarNavigationData";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const DashboardSidebarLayout = () => {
  const pathname = usePathname();
  const activeId = pathname.split("/")[1] || "/dashboard"; // assumes URL like /dashboard, /pos, etc.

  return (
    <section className="bg-white px-3">
      <section>
        <p className="text-sm font-semibold px-4 pt-4 text-[#A6A6A6]">Menu</p>
        <hr className="my-2 text-[#E6E6E6]" />
        <nav className="flex flex-col gap-2 px-4 pb-4">
          {DashboardSidebarNavigationData.map((item) => {
            const isActive = item.id === activeId;

            return (
              <Link
                href={`/${item.id}`}
                key={item.id}
                className={`flex items-center gap-2 pl-1 pr-2 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition font-normal ${
                  isActive ? "bg-gray-200 font-medium text-[#898989]" : "text-[#898989] "
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span className="text-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </section>
    </section>
  );
};

export default DashboardSidebarLayout;
