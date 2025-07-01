import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import Pagination from "../Pagination/Pagination";
import { Switch } from "../Modals/Settings/ui/Switch";
import { motion, AnimatePresence } from "framer-motion";
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

interface ProductCatalogProps {
  hideImages: boolean;
}

const ProductCatalogGrid: React.FC<ProductCatalogProps> = ({ hideImages }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(5);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;

  const outlet = useSelectedOutlet();
  const outletId = outlet?.outlet.id;
    const {setProductClicked, setSelectedProduct} = useProductManagementStore()
  

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
  const handleProductClick=(product:Product)=>{
    setProductClicked(true)
    setSelectedProduct(product)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!outletId) return;

  return (
    <section className="p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="py-12">
          <EmptyProduct />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="rounded-lg shadow-sm bg-white overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={()=> handleProductClick(product)}
              >
                <AnimatePresence mode="wait">
                  {hideImages ? (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="h-3 w-full mb-3.5 bg-[#15BA5C] rounded-t-lg"
                    />
                  ) : (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="mb-3"
                    >
                      <Image
                        src={product.logoUrl as string}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="rounded-t-md"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1 px-2.5 py-1.5">
                  <h4 className="inline-block border border-[#15BA5C] text-sm font-semibold rounded-[10px] bg-[#15BA5C0D] text-[#15BA5C] px-3 py-1">
                    {product.category}
                  </h4>
                  <h3 className="text-[#1C1B20] font-semibold text-lg">
                    {product.name}
                  </h3>
                  <p className="text-[#15BA5C] text-sm">£{product.price}</p>

                  <div className="flex items-center justify-between gap-2 mt-2">
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
                    <Switch
                      checked={product.isActive}
                      onChange={() => toggleAvailability(product.id)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ProductCatalogGrid;
