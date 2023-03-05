import { api } from "@/utils/api";
import type { Shipping } from "@prisma/client";
import type { FormikValues } from "formik";
import { Formik, Form, Field } from "formik";
import type { FC } from "react";
import React from "react";
import Modal from "../UI/Modal/Index";
import { useNotification } from "react-hook-notification";

const status = ["REDY_TO_SHIP", "SHIPPED", "DELIVERED"];

type Props = {
  shipping: Shipping;
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
};

const ChangeStatusShipping: FC<Props> = ({
  handleClose,
  isOpen,
  shipping,
  refetch,
}) => {
  const notification = useNotification();
  const ChangeStatus = api.shipping.changeStatus.useMutation({
    onSuccess: () => {
      notification.success({
        text: "Status changed successfully",
        position: "bottom-right",
        theme: "dark",
      });
      refetch();

      handleClose();
    },
  });
  const handleSubmit = (values: FormikValues) => {
    ChangeStatus.mutate({
      id: shipping.id,
      status: values.status,
    });
  };

  return (
    <Modal title="Edit Status" state={isOpen} onClose={handleClose}>
      <Formik
        initialValues={{
          status: shipping.status,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="w-[200px] md:w-[400px]">
          <Field
            name="status"
            as="select"
            className="block w-full rounded-lg border-2 border-indigo-500 bg-neutral-800 p-2.5 text-sm text-gray-50 focus:border-indigo-700 focus:ring-blue-700"
          >
            {status.map((status) => (
              <option key={status} value={status} className="text-gray-50">
                {status}
              </option>
            ))}
          </Field>
          <button className="emerald-button mt-4 w-full items-center justify-center">
            Save
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ChangeStatusShipping;
