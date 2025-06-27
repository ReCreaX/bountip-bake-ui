import { useState } from "react";
import { Switch } from "../Modals/Settings/ui/Switch";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Pagination from "../Pagination/Pagination";
import { Product } from "@/types/product";
import { productData } from "@/data/dummyData/product";

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const toggleAvailability = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, availability: !product.availability }
          : product
      )
    );
  };

  return (
    <div className="">
      <div className="w-full">
        <table className="w-full table-fixed">
          <thead className="bg-[#FAFAFC] px-2.5">
            <tr>
              <th className="w-1/3 px-6 py-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </span>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="w-20 px-6 py-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </span>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="w-24 px-6 py-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </span>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="w-40 px-6 py-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allergens
                  </span>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="w-28 px-6 py-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </span>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-lg"
                      src={product.image}
                      alt={product.name}
                    />

                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </span>
                      {/* {product.hasDiscount && (
                        <div className="ml-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            D
                          </span>
                        </div>
                      )} */}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  £{product.price}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-4 py-1 border border-[#15BA5C] text-sm font-semibold rounded-[10px] bg-[#15BA5C0D] text-[#15BA5C]">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      Fish
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      Peanuts
                    </span>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        +{product.allergens.length}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Switch
                    checked={product.availability}
                    onChange={() => toggleAvailability(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductCatalog;
