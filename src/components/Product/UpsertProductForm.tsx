import { api } from "@/utils/api";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { ProductInput } from "prisma/inputs";
import type { FC } from "react";
import { useMemo } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "../Inputs/TextField";
import Loader from "../Loader";
import { useNotification } from "react-hook-notification";

const Schema = ProductInput.pick({
  name: true,
  description: true,
  price: true,
  stock: true,
});

type Props = {
  onCancel: () => void;
  onAddUser: () => void;
  productId: string;
  isEdit?: boolean;
};

const UpsertProductForm: FC<Props> = ({
  onAddUser,
  onCancel,
  productId,
  isEdit,
}) => {
  const notification = useNotification();
  const addProduct = api.product.addProduct.useMutation({
    onSuccess() {
      onAddUser();
      notification.success({
        text: "Product added successfully",
        position: "bottom-right",
        theme: "dark",
      });
      onCancel();
    },

    onError() {
      notification.error({
        text: "Error adding product",
        position: "bottom-right",
        theme: "dark",
      });
      onCancel();
    },
  });

  const editProduct = api.product.editProduct.useMutation({
    onSuccess() {
      onAddUser();
      notification.success({
        text: "Product edited successfully",
        position: "bottom-right",
        theme: "dark",
      });
      onCancel();
    },

    onError() {
      notification.error({
        text: "Error adding product",
        position: "bottom-right",
        theme: "dark",
      });
      onCancel();
    },
  });

  const {
    data: editValues,
    isLoading,
    refetch,
  } = api.product.getProductById.useQuery({
    id: productId,
  });

  const inicialValues = useMemo(() => {
    return {
      name: editValues?.name || "",
      description: editValues?.description || "",
      price: editValues?.price || 0,
      stock: editValues?.stock || 0,
    };
  }, [editValues, isLoading, isEdit, productId]);

  const onSubmit = async (
    values: typeof inicialValues,
    formikHelpers: FormikHelpers<typeof inicialValues>
  ) => {
    if (isEdit) {
      await editProduct.mutateAsync({
        id: editValues?.id || "",
        ...values,
      });

      refetch();
      formikHelpers.resetForm();
      return;
    }
    await addProduct.mutateAsync(values);
    formikHelpers.resetForm();
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={inicialValues}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(Schema)}
        >
          {({ errors, touched }) => (
            <Form className="w-[600px]">
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
                    error={errors.stock}
                    touched={touched.stock}
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
                    {isEdit ? "Edit" : "Add"}
                  </button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default UpsertProductForm;
