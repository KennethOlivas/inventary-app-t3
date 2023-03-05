import type { Product } from "@prisma/client";
import type { FC } from "react";
import React from "react";

type Props = {
  product: Product;
};

const ProdcutsSumary: FC<Props> = ({ product }) => {
  return (
    <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
      <div className="flex w-full flex-col items-start justify-start space-y-2">
        <h3 className="text-xl font-semibold leading-6 text-gray-100 xl:text-2xl">
          {product.name}
        </h3>
        <div className="flex flex-col items-start justify-start space-y-2">
          <p className="text-sm leading-none text-gray-100">
            <span className="font-bold text-gray-300">Description: </span>
            {product.description}
          </p>
        </div>
      </div>
      <div className="flex w-full items-start justify-between space-x-8">
        <p className="text-base leading-6 text-white xl:text-lg">
          ${product.price}
        </p>
        <p className="text-base leading-6 text-gray-100 xl:text-lg">01</p>
        <p className="text-base font-semibold leading-6 text-gray-50 xl:text-lg">
          $36.00
        </p>
      </div>
    </div>
  );
};

export default ProdcutsSumary;
