import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { Switch } from "../Modals/Settings/ui/Switch";
import Pagination from "../Pagination/Pagination";
import { Product } from "@/types/product";
import productManagementService from "@/services/productManagementService";
import { useSelectedOutlet } from "@/hooks/useSelectedOutlet";
import EmptyProduct from "./EmptyProduct";
import { useProductManagementStore } from "@/stores/useProductManagementStore";

interface ProductResponse {
  status: boolean;
  data?: {
    data: Product[];
    meta: {
      totalPages: number;
      total: number;
    };
  };
}

const ProductCatalog: React.FC = () => {
  const {setProductClicked, setSelectedProduct} = useProductManagementStore()
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(5);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;

  const outlet = useSelectedOutlet();
  const outletId = outlet?.outlet.id;
  const handleProductClick=(product:Product)=>{
    setProductClicked(true)
    setSelectedProduct(product)
  }

  const fetchProducts = async (page: number) => {
    if (!outletId) return;

    setLoading(true);
    setError(null);

    try {
      const response = (await productManagementService.fetchProducts(outletId, {
        page: page,
        limit: productsPerPage,
      })) as ProductResponse;

      if (response.status && response.data) {
        setProducts(response.data.data || []);
        setTotalPages(response.data.meta.totalPages || 1);
        setTotalProducts(response.data.meta.total || 0);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, outletId]);

  const toggleAvailability = async (id: number) => {
    const productToToggle = products.find((product) => product.id === id);
    if (!productToToggle) return;

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, isActive: !product.isActive }
          : product
      )
    );

    try {
      // Uncomment when API available
      // await productManagementService.updateProductStatus(outletId, id, !productToToggle.isActive);
      console.log(`Toggling availability for product ${id}`);
    } catch (err) {
      console.error("Error updating product availability:", err);

      // revert UI on failure
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, isActive: !product.isActive }
            : product
        )
      );
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!outletId) return;

  return (
    <div className="">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="w-full">
        <table className="w-full table-fixed bg-[#FAFAFC]">
          <thead className=" px-2.5">
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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span className="ml-2">Loading products...</span>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  <EmptyProduct />
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr onClick={()=> handleProductClick(product)} key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-lg"
                        src={product.logoUrl as string}
                        alt={product.name}
                        width={40}
                        height={40}
                      />
                      <div className="flex items-center min-w-0 flex-1">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </span>
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
                      {product.allergenList?.allergies
                        ?.slice(0, 2)
                        .map((allergen, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                          >
                            {allergen}
                          </span>
                        ))}
                      {product.allergenList?.allergies &&
                        product.allergenList.allergies.length > 2 && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              +{product.allergenList.allergies.length - 2}
                            </span>
                          </div>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Switch
                      checked={product.isActive}
                      onChange={() => toggleAvailability(product.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
