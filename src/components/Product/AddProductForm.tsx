import { api } from "@/utils/api";
import { Form, Formik, FormikHelpers } from "formik";
import { ProductInput } from "prisma/inputs";
import React, { FC, useMemo } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "../Inputs/TextField";

const Schema = ProductInput.pick({
  name: true,
  description: true,
  price: true,
  stock: true,
});

type Props = {
  onCancel: () => void;
  onAddUser: () => void;
};

const AddProductForm: FC<Props> = ({ onAddUser, onCancel }) => {
  const addProduct = api.product.addProduct.useMutation({
    onSuccess() {
      onAddUser();
      onCancel();
    },

    onError() {
      console.log("error");
      onCancel();
    },
  });

  const inicialValues = useMemo(() => {
    return {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    };
  }, []);
  const onSubmit = async (
    values: typeof inicialValues,
    formikHelpers: FormikHelpers<typeof inicialValues>
  ) => {
    await addProduct.mutateAsync(values);
    formikHelpers.resetForm();
  };
  return (
    <Formik
      initialValues={inicialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(Schema)}
    >
      {({ errors, touched }) => (
        <Form>
          <>
            <div className="my-4 flex flex-col space-y-4">
              <TextField
                id="name"
                name="name"
                placeholder="Product Name"
                type="text"
                error={errors.name}
                touched={touched.name}
              />

              <TextField
                id="stock"
                name="stock"
                placeholder="Stock"
                type="number"
                error={errors.price}
                touched={touched.price}
              />

              <TextField
                id="price"
                name="price"
                placeholder="Price"
                type="number"
                error={errors.price}
                touched={touched.price}
              />

              <TextField
                id="description"
                name="description"
                placeholder="Description"
                component="textarea"
                type="textarea"
                error={errors.description}
                touched={touched.description}
              />
            </div>
            <div className="spacex-4 flex justify-evenly space-x-4">
              <button
                type="button"
                className="w-full rounded-md bg-pink-600 px-4 py-2 text-white/90 shadow-lg shadow-pink-600/40 transition-all duration-200 hover:bg-pink-500 hover:text-white"
                onClick={onCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
              >
                Submit
              </button>
            </div>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
