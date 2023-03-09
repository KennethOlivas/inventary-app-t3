import type { Customer, Order, Shipping } from "@prisma/client";
import type { FC } from "react";
import React from "react";
import CustomerSumary from "./CustomerSumary";
import ProdcutsSumary from "./ProdcutsSumary";
import ShippingSumary from "./ShippingSumary";
import Sumary from "./Sumary";
import { motion } from "framer-motion";

type OrderData =
  | Order & {
      Shipping: Shipping | null;
      Customer: Customer;
    };

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 150, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface Props {
  order: OrderData;
  refetch: () => void;
}

const OrderSumary: FC<Props> = ({ order, refetch }) => {
  const { createdAt, Shipping, Customer, id } = order;

  return (
    <div className="px-2 pt-4 ">
      <div className="item-start flex flex-col justify-start">
        <p className="text-base font-medium leading-6 text-gray-400">
          {createdAt.toLocaleString()}
        </p>
        <p className="text-lg font-semibold text-white">
          Status <span className="text-indigo-500">{order.status}</span>
        </p>
      </div>
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="jusitfy-center mt-4 flex w-full flex-col items-stretch  space-y-4 md:space-y-6 xl:flex-row xl:space-x-4 xl:space-y-0"
      >
        <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
          <motion.div
            variants={item}
            className="flex w-full flex-col items-start justify-start rounded-md bg-neutral-900 px-4 py-4 md:p-6 md:py-6 xl:p-8"
          >
            <p className="text-lg font-semibold leading-6 text-gray-100 md:text-xl xl:leading-5">
              Products
            </p>
            <div>
              <p className="text-sm font-medium leading-5 text-gray-400"></p>
            </div>
            <ProdcutsSumary orderId={id} />
          </motion.div>
          <motion.div
            variants={item}
            className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 "
          >
            <Sumary
              iva={order.iva}
              subTotal={order.subTotal}
              shipping={Shipping?.price}
              total={order.total}
            />
            {Shipping && (
              <ShippingSumary refetch={refetch} shipping={Shipping} />
            )}
          </motion.div>
        </div>
        <motion.div variants={item}>
          <CustomerSumary customer={Customer} />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default OrderSumary;
