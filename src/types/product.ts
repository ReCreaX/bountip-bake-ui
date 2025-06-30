import { StaticImageData } from "next/image";
import { Outlet } from "./outlet";

export interface Product {
  id: number;
  outletId: number;
  isActive: boolean;
  isMainLocation: boolean;
  name: string;
  description: string | null;
  category: string | null;
  price: number | null;
  preparationArea: string | null;
  priceTierId: number | null;
  allergenList: {
    allergies: string[];
  } | null;
  logoUrl: string  | StaticImageData;
  logoHash: string | null;
  createdAt: Date;
  updatedAt: Date;
  outlet?: Outlet;
}
