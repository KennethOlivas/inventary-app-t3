import { api } from "@/utils/api";
import type { FormikHelpers } from "formik";
import { Formik, Form } from "formik";
import { UserInput } from "prisma/inputs";
import type { FC } from "react";
import React, { useMemo } from "react";
import { useNotification } from "react-hook-notification";

import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "../Inputs/TextField";

const Schema = UserInput.pick({
  name: true,
  email: true,
});

type Props = {
  onCancel: () => void;
  onAddUser: () => void;
};

const AddUserForm: FC<Props> = ({ onCancel, onAddUser }) => {
  const notification = useNotification();
  const addUser = api.user.addUser.useMutation({
    onSuccess() {
      notification.success({
        text: "User added successfully",
        position: "bottom-right",
        theme: "dark",
      });

      onAddUser();

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

  const inicialValues = useMemo(() => {
    return {
      name: "",
      email: "",
    };
  }, []);

  const onSubmit = async (
    values: typeof inicialValues,
    formikHelpers: FormikHelpers<typeof inicialValues>
  ) => {
    await addUser.mutateAsync(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={inicialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(Schema)}
    >
      {({ errors, touched }) => (
        <Form className="w-[400px]">
          <>
            <div className="my-4 flex flex-col space-y-4">
              <TextField
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                error={errors.name}
                touched={touched.name}
              />
              <TextField
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                error={errors.email}
                touched={touched.email}
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

export default AddUserForm;
