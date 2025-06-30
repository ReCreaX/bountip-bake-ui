import { Product } from "@/types/product";
import AssetsFiles from "@/assets";

const now = new Date();

const productNames = [
  "Blueberry Muffin", "Fruit Tart", "Peanut Butter Cookie", "Lemon Cake", "Honey Wheat Bread",
  "Multigrain Bread", "Strawberry Shortcake", "Garlic Breadsticks", "Cheese Danish", "Cinnamon Roll",
  "Pita Bread", "Macaron Box", "Carrot Cake", "Pumpkin Pie", "Oatmeal Cookie", "Coconut Bread",
  "Hazelnut Brownie", "Cheddar Biscuits", "Sweet Rolls", "French Baguette", "Apple Pie",
  "Brown Sugar Muffin", "Butter Croissant", "Marble Cake", "Challah Bread", "Mocha Cupcake",
  "Peach Tart", "Crusty Italian Bread", "Walnut Brownie", "Cherry Danish", "Sponge Cake",
  "Honeycomb Bread", "Molasses Cookie", "Zucchini Bread", "Toffee Pudding", "Pecan Pie",
  "Mini Donuts", "Spelt Bread", "Maple Muffin", "Red Velvet Cake", "Sage Focaccia", "Cranberry Muffin"
];

const categories = ["Bread", "Cake", "Cookie", "Pastry", "Pie", "Dough"];
const allergensPool = ["Gluten", "Milk", "Eggs", "Nuts", "Soy", "Peanuts", "Dairy", "Seeds", "Walnuts", "Coconut"];

function getRandomAllergens(): string[] {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...allergensPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const productData: Product[] = productNames.map((name, index) => ({
  id: index + 4,
  outletId: 1,
  isActive: Math.random() > 0.5,
  isMainLocation: false,
  name,
  description: null,
  category: categories[Math.floor(Math.random() * categories.length)],
  price: Math.floor(Math.random() * 46) + 15,
  preparationArea: null,
  priceTierId: null,
  allergenList: {
    allergies: getRandomAllergens(),
  },
  logoUrl: AssetsFiles.AuthBgImage,
  logoHash: null,
  createdAt: now,
  updatedAt: now,
 
}));
