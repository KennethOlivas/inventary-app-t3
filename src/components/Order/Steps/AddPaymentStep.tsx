import Switch from "@/components/UI/Switch";
import { useState } from "react";

const AddPaymentStep = () => {
  const [hasShipping, setHasShipping] = useState(false);

  const handleShippingChange = (enabled: boolean) => {
    setHasShipping(enabled);
  };
  return (
    <div className="mt-8 flex-col space-y-4">
      <div className="flex space-x-3 py-2">
        <h2 className="text-xl font-semibold tracking-widest text-gray-50">
          Shipping:{" "}
        </h2>
        <Switch enabled={hasShipping} setEnabled={handleShippingChange} />
      </div>
      {hasShipping && (
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <h3 className="text-lg font-semibold tracking-widest text-gray-50">
              Address:{" "}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPaymentStep;
