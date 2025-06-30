import AssetsFiles from "@/assets";
import Image from "next/image";

const EmptyProduct = () => {
  return (
    <section className="flex items-center justify-center h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-5">
        <Image
          src={AssetsFiles.NoProduct}
          alt="No Product found"
          className="h-[200px]"
        />
        <div className="flex flex-col gap-5">
          <h3 className="text-center text-[#1C1B20] font-medium text-2xl">No Product Created</h3>
          <p className="text-sm text-[#898989]">
            You have no product in stock at the moment click on the button above
            to create a product
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmptyProduct;
