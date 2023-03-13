import { api } from "@/utils/api";
import type { FormikValues } from "formik";
import { Field, Form, Formik } from "formik";
import type { FC } from "react";
import { useNotification } from "react-hook-notification";

const statusOrder = ["PENDING", "COMPLETED", "CANCELED"];

type Props = {
  id: string;
  status: string;
  refetch: () => void;
  onStatusChange: () => void;
};

const ChangeOrderStatusForm: FC<Props> = ({
  id,
  status,
  refetch,
  onStatusChange,
}) => {
  const notification = useNotification();
  const changeStatus = api.order.changeStatus.useMutation({
    onSuccess: () => {
      notification.success({
        text: "Order status changed successfully",
        position: "bottom-right",
        theme: "dark",
      });
      refetch();
    },
    onError: (e) => {
      notification.error({
        text: e.message,
        position: "bottom-right",
        theme: "dark",
      });
    },
  });

  const handleSubmit = async (values: FormikValues) => {
    await changeStatus.mutateAsync({ id, status: values.status });
    onStatusChange();
  };
  return (
    <div>
      <Formik
        initialValues={{
          status,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="w-[200px] md:w-[400px]">
          <Field
            name="status"
            as="select"
            className="block w-full rounded-lg border-2 border-indigo-500 bg-neutral-800 p-2.5 text-sm text-gray-50 focus:border-indigo-700 focus:ring-blue-700"
          >
            {statusOrder.map((status) => (
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
    </div>
  );
};

export default ChangeOrderStatusForm;
