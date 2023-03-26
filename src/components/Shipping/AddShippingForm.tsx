import { Field, Form, Formik } from "formik";
import { ShippingInput } from "prisma/inputs";
import type { FC } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "../Inputs/TextField";
import { addShipping, selectOrder } from "@/store/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Cities } from "@prisma/client";

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
  const initialValues = {
    name: customer?.name || "",
    address: customer?.address || "",
    city: customer?.city || "",
    status: shipping?.status || "REDY_TO_SHIP",
    price: shipping?.price || 0,
  };

  const onSubmit = async (values: typeof initialValues) => {
    dispatch(
      addShipping({
        address: values.address,
        city: values.city,
        name: values.name,
        price: values.price,
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
        {({ handleSubmit }) => (
          <Form className="flex flex-col space-y-4">
            <TextField name="name" id="name" placeholder="Full Name" />
            <TextField name="address" id="address" placeholder="Address" />
            <Field
              name="city"
              as="select"
              className="block w-full rounded-lg border-2 border-neutral-50 bg-neutral-900 p-3 text-sm text-gray-50 focus:border-indigo-700 focus:ring-blue-700"
            >
              {Object.keys(Cities)
                .filter((v) => isNaN(Number(v)))
                .map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
            </Field>
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddShippingForm;
