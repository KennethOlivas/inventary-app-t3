import { selectOrder } from "@/store/features/order/orderSlice";
import { api } from "@/utils/api";
import {
  ClipboardDocumentListIcon,
  CreditCardIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Step from "../UI/Step";
import AddCustomerStep from "./Steps/AddCustomerStep";
import AddPaymentStep from "./Steps/AddPaymentStep";
import AddProductStep from "./Steps/AddProductStep";
import AddShippingStep from "./Steps/AddShippingStep";

const AddOrderForm = () => {
  const [step, setStep] = useState<number>(1);
  const { customer, products, order, shipping } = useSelector(selectOrder);
  const addOrder = api.order.addOrder.useMutation();
  const invoiceNumber = useMemo(() => {
    return (Math.floor(Math.random() * 1000) + 1).toString();
  }, []);
  const steps = useMemo(
    () => [
      {
        step: 1,
        icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
        description: "Add products to the order",
        title: "Products",
      },
      {
        step: 2,
        icon: <UserIcon className="h-6 w-6" />,
        description: "Add customer information",
        title: "Customer",
      },
      {
        step: 3,
        icon: <TruckIcon className="h-6 w-6" />,
        description: "Add shipping information",
        title: "Shipping",
      },
      {
        step: 4,
        icon: <CreditCardIcon className="h-6 w-6" />,
        description: "Add payment information",
        title: "Payment",
      },
    ],
    []
  );

  const valideteStep = () => {
    if (!products) return;
    if (step === 1) {
      return products.length > 0;
    }
    if (step === 2) {
      return customer !== null;
    }
    return true;
  };

  const handleSubmit = () => {
    addOrder.mutate({
      customerId: customer?.id || "",
      invoiceNumber,
      products:
        products?.map((p) => ({
          id: p.id,
          quantity: p.quantity,
        })) || [],
      iva: order?.iva || 0,
      subTotal: order?.subTotal || 0,
      total: order?.total || 0,
      shipping: order?.shipping || false,
      status: "PENDING",
      shippingOrder: {
        address: shipping?.address || "",
        city: shipping?.city || "",
        name: shipping?.name || "",
        price: shipping?.price || 0,
        status: "REDY_TO_SHIP",
      },
    });
  };

  return (
    <div className=" w-auto transition-all duration-150 lg:w-[1000px] xl:w-[1200px]">
      <div>
        <ol className="grid grid-cols-1 divide-x divide-neutral-700 overflow-hidden rounded-lg border border-neutral-700 text-sm text-gray-500 sm:grid-cols-4">
          {steps.map((stepItem) => (
            <Step
              key={stepItem.step}
              icon={stepItem.icon}
              description={stepItem.description}
              title={stepItem.title}
              isStepActive={stepItem.step <= step}
            />
          ))}
        </ol>
        <div className="mt-4">
          {step === 1 && <AddProductStep />}
          {step === 2 && <AddCustomerStep />}
          {step === 3 && <AddShippingStep />}
          {step === 4 && <AddPaymentStep />}
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setStep(step - 1)}
              className={`indigo-button ${
                products?.length === 0 && "cursor-not-allowed opacity-50"
              }`}
              disabled={step === 1}
            >
              Previous
            </button>

            {step === 4 ? (
              <button onClick={handleSubmit} className="indigo-button">
                Add Order
              </button>
            ) : (
              <button
                onClick={() => setStep(step + 1)}
                className={`indigo-button ${
                  !valideteStep() && "cursor-not-allowed opacity-50"
                }`}
                disabled={!valideteStep()}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderForm;
