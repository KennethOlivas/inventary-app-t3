import AddShippingForm from "@/components/Shipping/AddShippingForm";
import Switch from "@/components/UI/Switch";
import { deleteShipping } from "@/store/features/order/orderSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddShippingStep = () => {
  const dispatch = useDispatch();
  const [hasShipping, setHasShipping] = useState(false);

  useEffect(() => {
    dispatch(deleteShipping(hasShipping));
  }, [hasShipping]);

  const handleShippingChange = (enabled: boolean) => {
    setHasShipping(enabled);
  };

  return (
    <div className="mt-8 flex-col space-y-4">
      <div className="flex justify-between space-x-3 py-2">
        <div className="flex">
          <h2 className="pr-2 text-xl font-semibold tracking-widest text-gray-50">
            Shipping:
          </h2>
          <Switch enabled={hasShipping} setEnabled={handleShippingChange} />
        </div>
      </div>

      {hasShipping && <AddShippingForm />}
    </div>
  );
};

export default AddShippingStep;
