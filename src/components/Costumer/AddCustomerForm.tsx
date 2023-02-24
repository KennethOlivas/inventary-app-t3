import { api } from "@/utils/api";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { CustomerInput } from "prisma/inputs";
import type { FC } from "react";
import React from "react";
import { useNotification } from "react-hook-notification";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ActionsButtons from "../UI/ActionsButtons.tsx";
import FormInputs from "./FormInputs";

const Schema = CustomerInput.pick({
  name: true,
  lastName: true,
  email: true,
  phone: true,
  address: true,
});

type Props = {
  onCancel: () => void;
  onAddUser: () => void;
};

const AddCustomerForm: FC<Props> = ({ onAddUser, onCancel }) => {
  const notification = useNotification();
  const addCustomer = api.customer.addCustomer.useMutation({
    onSuccess() {
      notification.success({
        text: "Customer added successfully",
        position: "bottom-right",
        theme: "dark",
      });
      onAddUser();
      onCancel();
    },

    onError(e) {
      notification.error({
        text: e.message,
        position: "bottom-right",
        theme: "dark",
      });
      console.log("error");
      onCancel();
    },
  });
  const inicialValues = {
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  };

  const onSubmit = async (
    values: typeof inicialValues,
    formikHelpers: FormikHelpers<typeof inicialValues>
  ) => {
    await addCustomer.mutateAsync(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={inicialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(Schema)}
    >
      <Form>
        <FormInputs />
        <ActionsButtons onCancel={onCancel} />
      </Form>
    </Formik>
  );
};

export default AddCustomerForm;
