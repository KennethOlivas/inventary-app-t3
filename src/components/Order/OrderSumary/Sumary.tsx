import type { FC } from "react";
import React from "react";

type Props = {
  subTotal: number;
  iva: number;
  shipping?: number;
  total: number;
};

const Sumary: FC<Props> = ({ iva, shipping, subTotal, total }) => {
  return (
    <div className="flex w-full flex-col space-y-6 rounded-md bg-neutral-900 px-4 py-6 md:p-6 xl:p-8 ">
      <h3 className="text-xl font-semibold leading-5 text-gray-50">Summary</h3>
      <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4">
        <div className="flex w-full  justify-between">
          <p className="text-base leading-4 text-gray-200">Subtotal</p>
          <p className="text-base leading-4 text-gray-50">${subTotal}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-base leading-4 text-gray-200">IVA </p>
          <p className="text-base leading-4 text-gray-50">${iva} (15%)</p>
        </div>
        {shipping && (
          <div className="flex w-full items-center justify-between">
            <p className="text-base leading-4 text-gray-200">Shipping</p>
            <p className="text-base leading-4 text-gray-50">${shipping}</p>
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-base font-semibold leading-4 text-gray-50">Total</p>
        <p className="text-base font-semibold leading-4 text-gray-50">
          ${total}
        </p>
      </div>
    </div>
  );
};

export default Sumary;
