// import { useState } from "react";
// import Image from "next/image";
// import { Product } from "@/types/product";
// import { productData } from "@/data/dummyData/product";
// import Pagination from "../Pagination/Pagination";
// import { Switch } from "../Modals/Settings/ui/Switch";

// interface ProductCatalogProps {
//   hideImages: boolean;
// }
// const ProductCatalogGrid: React.FC<ProductCatalogProps> = ({ hideImages }) => {
//   const [products, setProducts] = useState<Product[]>(productData);
//   const [currentPage, setCurrentPage] = useState(1);

//   const productsPerPage = 9; // 3 columns per row, 3 rows per page
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const toggleAvailability = (id: number) => {
//     setProducts((prev) =>
//       prev.map((product) =>
//         product.id === id
//           ? { ...product, availability: !product.availability }
//           : product
//       )
//     );
//   };

//   return (
//     <section className="p-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {currentProducts.map((product) => (
//           <div key={product.id} className=" rounded-lg  shadow-sm bg-white">
//             {hideImages ? (
//               <div className="h-3 w-full mb-3.5 bg-[#15BA5C] rounded-t-lg"></div>
//             ) : (
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={400}
//                 height={400}
//                 className="rounded-t-md mb-3"
//               />
//             )}
//             <div className="space-y-1 px-2.5 py-1.5">
//               <h4 className="inline-block border border-[#15BA5C] text-sm font-semibold rounded-[10px] bg-[#15BA5C0D] text-[#15BA5C] px-3 py-1">
//                 {product.category}
//               </h4>
//               <h3 className="text-[#1C1B20] font-semibold text-lg">
//                 {product.name}
//               </h3>
//               <p className="text-[#15BA5C] text-sm">£{product.price}</p>

//               <div className="flex items-center justify-between gap-2 mt-2">
//                 <div className="flex items-center space-x-1">
//                   <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
//                     Fish
//                   </span>
//                   <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
//                     Peanuts
//                   </span>
//                   <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-white text-xs font-bold">
//                       +{product.allergens.length}
//                     </span>
//                   </div>
//                 </div>
//                 <Switch
//                   checked={product.availability}
//                   onChange={() => toggleAvailability(product.id)}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </div>
//     </section>
//   );
// };

// export default ProductCatalogGrid;

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { productData } from "@/data/dummyData/product";
import Pagination from "../Pagination/Pagination";
import { Switch } from "../Modals/Settings/ui/Switch";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCatalogProps {
  hideImages: boolean;
}

const ProductCatalogGrid: React.FC<ProductCatalogProps> = ({ hideImages }) => {
  const [products, setProducts] = useState<Product[]>(productData);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const toggleAvailability = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, availability: !product.availability }
          : product
      )
    );
  };

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="rounded-lg shadow-sm bg-white overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
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
                    src={product.image}
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
                <Switch
                  checked={product.availability}
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
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default ProductCatalogGrid;
