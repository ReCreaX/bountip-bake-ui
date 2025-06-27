import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  allergens: string[];
  availability: boolean;
  hasDiscount?: boolean;
  image: StaticImageData | string;
}