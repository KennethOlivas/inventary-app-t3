import { Form, Formik } from "formik";
import { ShippingInput } from "prisma/inputs";
import type { FC} from "react";
import { useEffect, useState } from "react";
import type { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "../Inputs/TextField";
import { addShipping, selectOrder } from "@/store/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const schema = ShippingInput.pick({
  name: true,
  address: true,
  city: true,
  status: true,
  price: true,
});

const AddShippingForm: FC = () => {
  const dispatch = useDispatch();
  const { shipping, customer } = useSelector(selectOrder);
  const [initialValues, setInitialValues] = useState<z.infer<typeof schema>>({
    name: shipping?.name || "",
    address: shipping?.address || "",
    city: shipping?.city || "",
    status: shipping?.status || "REDY_TO_SHIP",
    price: shipping?.price || 0,
  });

  useEffect(() => {
    setInitialValues({
      name: shipping?.name || "",
      address: shipping?.address || "",
      city: shipping?.city || "",
      status: shipping?.status || "REDY_TO_SHIP",
      price: shipping?.price || 0,
    });
  }, [shipping]);

  const onSubmit = async (values: typeof initialValues) => {
    dispatch(addShipping(values));
  };

  const handleFillWithCustomerData = () => {
    dispatch(
      addShipping({
        name: customer?.name + " " + customer?.lastName || "",
        price: 0,
        city: "",
        address: customer?.address || "",
        status: "REDY_TO_SHIP",
      })
    );
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(schema)}
      >
        {({ values, setFieldValue, setValues, handleChange, handleSubmit }) => (
          <Form className="flex flex-col space-y-4">
            <TextField name="name" id="name" placeholder="Full Name" />
            <TextField name="address" id="address" placeholder="Address" />
            <TextField name="city" id="city" placeholder="city" />
            <TextField
              name="price"
              id="price"
              placeholder="Price shipping"
              type="number"
            />

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="indigo-button justify-center text-center capitalize"
                type="button"
              >
                save shipping
              </button>

              <button
                className="emerald-button justify-center text-center capitalize"
                type="button"
                onClick={() => {
                  handleFillWithCustomerData();
                  setValues({
                    name: customer?.name + " " + customer?.lastName || "",
                    price: 0,
                    city: "",
                    address: customer?.address || "",
                    status: "REDY_TO_SHIP",
                  });
                }}
              >
                Fill with customer data
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddShippingForm;
