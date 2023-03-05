import ChangeStatusShipping from "@/components/Shipping/ChangeStatusShipping";
import { TruckIcon } from "@heroicons/react/24/outline";
import type { Shipping } from "@prisma/client";

import type { FC } from "react";
import React, { useState } from "react";

type Props = {
  shipping: Shipping;
  refetch: () => void;
};

const ShippingSumary: FC<Props> = ({ shipping, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <div className="flex w-full flex-col justify-center space-y-6 rounded-md bg-neutral-900 px-4 py-6 md:p-6 xl:p-8">
      <h3 className="text-xl font-semibold leading-5 text-neutral-50">
        Shipping
      </h3>
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center justify-center space-x-4">
          <TruckIcon className="h-6 w-6 text-white" />
          <div className="flex flex-col items-center justify-start">
            <p className="text-lg font-semibold leading-6 text-neutral-50">
              Delivery: {shipping.address}
              <br />
              <span className="font-normal">
                STATUS :{" "}
                <span className="text-green-500">{shipping.status}</span>
              </span>
            </p>
          </div>
        </div>
        <p className="text-lg font-semibold leading-6 text-gray-50">
          ${shipping.price}
        </p>
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          onClick={handleOpen}
          className="yellow-button rounded-md py-5 text-center text-base font-bold leading-4 text-white md:w-full"
        >
          Edit Status
        </button>
      </div>
      <ChangeStatusShipping
        refetch={refetch}
        isOpen={isOpen}
        handleClose={handleClose}
        shipping={shipping}
      />
    </div>
  );
};

export default ShippingSumary;
