import { api } from "@/utils/api";
import { EnvelopeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import type { Customer } from "@prisma/client";
import type { FC } from "react";
import React from "react";

type Props = {
  customer: Customer;
};

const CustomerSumary: FC<Props> = ({ customer }) => {
  const { data: totalOrders } = api.order.bycountCustomerOrderId.useQuery({
    customerId: customer.id,
  });
  return (
    <div className="flex w-full flex-col items-center justify-between rounded-md bg-neutral-900 px-4 py-6 md:items-start md:p-6 xl:w-96 xl:p-8 ">
      <h3 className="text-xl font-semibold leading-5 text-gray-300">
        Customer
      </h3>
      <div className="flex  h-full w-full flex-col items-stretch justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0 ">
        <div className="flex flex-shrink-0 flex-col items-start justify-start">
          <div className="flex w-full  items-center  justify-center space-x-4 border-b border-gray-200 py-8 md:justify-start">
            <UserCircleIcon className="h-8 w-8" />
            <div className=" flex flex-col items-start justify-start space-y-2">
              <p className="text-left text-base font-semibold leading-4 text-gray-50">
                {customer.name} {customer.lastName}
              </p>
              <p className="text-sm leading-5 text-gray-50">
                {totalOrders} Previous Orders
              </p>
            </div>
          </div>

          <div className="flex w-full  items-center justify-center space-x-4 border-b border-gray-200 py-4 md:justify-start">
            <EnvelopeIcon className="h-6 w-6 text-white" />
            <p className="cursor-pointer text-sm leading-5 text-gray-100">
              {customer.email}
            </p>
          </div>
        </div>
        <div className="mt-6 flex w-full  flex-col items-stretch justify-between md:mt-0 xl:h-full">
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:justify-start md:space-x-6 md:space-y-0 lg:space-x-8 xl:flex-col  xl:space-x-0 xl:space-y-12 ">
            <div className="flex flex-col items-center  justify-center space-y-4 md:items-start md:justify-start xl:mt-8">
              <p className="text-center text-base font-semibold leading-4 text-gray-200 md:text-left">
                Shipping Address
              </p>
              <p className="w-48 text-center text-sm leading-5 text-gray-100 md:text-left lg:w-full xl:w-48">
                {customer.address}
              </p>
            </div>
            <div className="flex flex-col items-center  justify-center space-y-4 md:items-start md:justify-start ">
              <p className="text-center text-base font-semibold leading-4 text-gray-100 md:text-left">
                Billing Address
              </p>
              <p className="w-48 text-center text-sm leading-5 text-gray-100 md:text-left lg:w-full xl:w-48">
                {customer.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSumary;
