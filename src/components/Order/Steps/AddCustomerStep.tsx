import {
  addCustomer,
  deleteCustomer,
  selectOrder,
} from "@/store/features/order/orderSlice";
import { api } from "@/utils/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { Customer } from "@prisma/client";
import { motion } from "framer-motion";
import type { FC } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddCustomerStep: FC = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const { customer } = useSelector(selectOrder);
  const { data, isLoading } = api.customer.getCustomersByName.useQuery({
    name: search,
  });

  const handleAddCustomer = (customer: Customer) => {
    dispatch(
      addCustomer({
        ...customer,
      })
    );
    setSearch("");
  };

  const handleRemoveCustomer = () => {
    dispatch(deleteCustomer());
  };

  return (
    <div className="mt-8 mb-24">
      <div>
        <input
          type="text"
          placeholder="Search Customer"
          className="w-full rounded-lg border-2 border-gray-300 bg-transparent p-3 pl-4 text-gray-400 outline-none transition-all duration-150 focus:border-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isLoading ? (
          <div className="mt-24 flex items-center justify-center">
            loading...
          </div>
        ) : (
          <>
            {data?.map((customer) => (
              <motion.div
                initial={{ x: 10 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleAddCustomer(customer)}
                key={customer.id}
                className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg p-2 pl-3 text-gray-400 transition-all duration-150 hover:bg-indigo-500 hover:text-white"
              >
                <div className="flex flex-col">
                  <div className="text-base font-bold">
                    {customer.name} {customer.lastName}
                  </div>
                  <span className="mr-2 text-sm font-semibold">
                    email: {customer.email}
                  </span>
                  <span className="mr-2 text-sm">number: {customer.phone}</span>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {customer ? (
          <div className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg p-2 pl-3 text-gray-400 transition-all duration-150 hover:bg-indigo-500 hover:text-white">
            <div className="flex flex-col">
              <div className="text-base font-bold">
                {customer.name} {customer.lastName}
              </div>
              <span className="mr-2 text-sm font-semibold">
                email: {customer.email}
              </span>
            </div>
            <button
              onClick={handleRemoveCustomer}
              className="p-4  text-neutral-600 transition-all duration-200 hover:text-white"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddCustomerStep;
