import { StaticImageData } from "next/image";
import { Outlet } from "./outlet";

export interface ProductHistory {
  id: number;
  oldPrice: number;
  newPrice: number;
  changedBy?: string | null;
  changeReason?: string | null;
  changedAt: Date;
  product: Product;
  productId: number;
  role:string
}

export interface Product {
  id: number;
  outletId: number;
  isActive: boolean;
  name: string;
  description: string | null;
  category: string | null;
  price: number | null;
  preparationArea: string | null;
  weight: number | null;
  weightScale: string | null;
  packagingArea: string | null;
  priceTierId: number | null;
  allergenList: {
    allergies: string[];
  } | null;
  logoUrl: StaticImageData | string | null;
  logoHash: string | null;
  leadTime: number | null;
  createdAt: Date;
  updatedAt: Date;
  outlet: Outlet;
  priceHistory: ProductHistory[];
}
