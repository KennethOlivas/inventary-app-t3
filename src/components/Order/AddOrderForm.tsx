import { selectOrder } from "@/store/features/order/orderSlice";
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
import AddProductStep from "./Steps/AddProductStep";
import AddShippingStep from "./Steps/AddShippingStep";

const AddOrderForm = () => {
  const [step, setStep] = useState(1);
  const { customer, products } = useSelector(selectOrder);

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

  return (
    <div className="w-[1200px]">
      <Formik
        initialValues={{
          product: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
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
          <Form>
            <div className="mt-4">
              {step === 1 && <AddProductStep />}
              {step === 2 && <AddCustomerStep />}
              {step === 3 && <AddShippingStep />}
              {step === 4 && <div>Payment</div>}
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
                  <button type="submit" className="indigo-button">
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
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default AddOrderForm;
