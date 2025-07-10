import { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import Pagination from "../Pagination/Pagination";
import { Switch } from "../Modals/Settings/ui/Switch";
import { motion, AnimatePresence } from "framer-motion";
import { useSelectedOutlet } from "@/hooks/useSelectedOutlet";
import EmptyProduct from "./EmptyProduct";
import { useProductManagementStore } from "@/stores/useProductManagementStore";

interface ProductCatalogProps {
  hideImages: boolean;
}

const ProductCatalogGrid: React.FC<ProductCatalogProps> = ({ hideImages }) => {
  const outlet = useSelectedOutlet();
  const outletId = outlet?.outlet.id;

  // Zustand store state and actions
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    productsPerPage,
    fetchProducts,
    setProductClicked,
    setSelectedProduct,
    updateProductStatus,
    setCurrentPage,
    clearProducts,
    resetError,
  } = useProductManagementStore();

  // Fetch products when outlet changes or page changes
  useEffect(() => {
    if (outletId) {
      fetchProducts(outletId, currentPage, productsPerPage);
    } else {
      clearProducts();
    }
  }, [outletId, currentPage, fetchProducts, clearProducts, productsPerPage]);

  // Clear products when outlet changes
  useEffect(() => {
    return () => {
      clearProducts();
    };
  }, [outletId, clearProducts]);

  const toggleAvailability = async (id: number) => {
    const productToToggle = products.find((product) => product.id === id);
    if (!productToToggle || !outletId) return;

    // Optimistically update UI
    updateProductStatus(id, !productToToggle.isActive);

    try {
      // Uncomment when API is available
      // await productManagementService.updateProductStatus(outletId, id, !productToToggle.isActive);
      console.log(`Toggling availability for product ${id}`);
    } catch (err) {
      console.error("Error updating product availability:", err);
      // Revert on failure
      updateProductStatus(id, productToToggle.isActive);
    }
  };

  const handleProductClick = (product: Product) => {
    setProductClicked(true);
    setSelectedProduct(product);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Clear error when component unmounts or outlet changes
  useEffect(() => {
    return () => {
      resetError();
    };
  }, [resetError]);

  if (!outletId) return null;

  return (
    <section className="p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={resetError}
            className="ml-2 text-red-800 underline hover:no-underline"
          >
            Dismiss
          </button>
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
                className="rounded-lg shadow-sm bg-white overflow-hidden flex flex-col w-full max-w-sm cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => handleProductClick(product)}
              >
                <AnimatePresence mode="wait">
                  {hideImages ? (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="h-[10px] w-full bg-[#15BA5C] rounded-t-lg"
                    />
                  ) : (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="relative overflow-hidden h-[200px]"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={product.logoUrl as string}
                        alt={product.name}
                        fill
                        className="object-cover w-full h-full rounded-t-md transition-transform duration-300"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1 px-2.5 py-2 flex flex-col justify-between flex-1">
                  <div className="">
                    <h4 className="inline-block border border-[#15BA5C] text-sm font-semibold rounded-[10px] bg-[#15BA5C0D] text-[#15BA5C] px-3 py-1">
                      {product.category}
                    </h4>
                  </div>
                  <h3 className="text-[#1C1B20] font-semibold text-lg truncate overflow-hidden whitespace-nowrap">
                    {product.name}
                  </h3>
                  <p className="text-[#15BA5C] text-sm">£{product.price}</p>

                  <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="flex items-center space-x-1 flex-wrap">
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
