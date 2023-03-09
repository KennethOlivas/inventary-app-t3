import { api } from "@/utils/api";
import type { FC } from "react";
import React from "react";

type Props = {
  orderId: string;
};

const ProdcutsSumary: FC<Props> = ({ orderId }) => {
  const { data: productsOrder, isLoading } = api.productOrder.byOder.useQuery({
    orderId,
  });

  if (isLoading) {
    return (
      <div className="mt-8">
        <div role="status" className="flex w-full animate-pulse space-x-12">
          <div className="mb-4 h-2.5 w-60 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-4 h-2.5 w-96 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-4 h-2.5 w-52 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
        <div role="status" className="flex w-full animate-pulse space-x-12">
          <div className="mb-4 h-2.5 w-60 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-4 h-2.5 w-96 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-4 h-2.5 w-52 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      {productsOrder?.map((item) => (
        <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8 ">
          <div className="flex w-full flex-col items-center justify-between space-y-4  p-2 transition-all duration-100 hover:rounded-md hover:border-0 hover:bg-neutral-800 hover:shadow-xl md:flex-row md:space-y-0">
            <div className="flex w-full flex-col items-start justify-start space-y-2">
              <h3 className="font-semibold leading-6 text-gray-100">
                {item.Product?.name}
              </h3>
              <div className="flex flex-col items-start justify-start space-y-2">
                <p className="text-sm leading-none text-gray-100">
                  <span className="font-bold text-gray-300">Description: </span>
                  {item.Product?.description}
                </p>
              </div>
            </div>
            <div className="flex w-full items-start justify-between space-x-8">
              <p className="text-base leading-6 text-white xl:text-lg">
                ${item.Product?.price}
              </p>
              <p className="text-base leading-6 text-gray-100 xl:text-lg">
                {item.quantity}
              </p>
              <p className="text-base font-semibold leading-6 text-gray-50 xl:text-lg">
                ${item.Product!.price * item.quantity}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProdcutsSumary;
