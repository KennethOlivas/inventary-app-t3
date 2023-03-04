import Switch from "@/components/UI/Switch";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { selectOrder } from "@/store/features/order/orderSlice";
import { useSelector } from "react-redux";
import Inoce from "@/components/Invoice";

const AddPaymentStep = () => {
  const { products, order, customer, shipping } = useSelector(selectOrder);
  const [hasShipping, setHasShipping] = useState(false);

  const handleShippingChange = (enabled: boolean) => {
    setHasShipping(enabled);
  };

  return (
    <>
      <div className=" py-6 sm:py-8 lg:py-12">
        <div className="mx-auto ">
          <Inoce />
        </div>
      </div>
    </>
  );
};

export default AddPaymentStep;
