import { api } from "@/utils/api";
import type { Role } from "@prisma/client";
import type { FormikValues } from "formik";
import { Field, Form, Formik } from "formik";
import type { ChangeEvent, FC } from "react";
import React from "react";
import { useNotification } from "react-hook-notification";

type Props = {
  id: string;
  roles?: Role[];
  refetch?: () => void;
};

const EditRoleForm: FC<Props> = ({ id, roles, refetch }) => {
  const allRoles: Role[] = ["ADMIN", "USER", "VENDOR", "LOGISTICS"];
  const notification = useNotification();
  const changeRole = api.user.addRole.useMutation({
    onSuccess: () => {
      notification.success({
        text: "Role change successfully",
        position: "bottom-right",
        theme: "dark",
      });
      refetch?.();
    },
    onError: (e) => {
      notification.error({
        text: e.message,
        position: "bottom-right",
        theme: "dark",
      });
    },
  });
  const initialValues = {
    roles: roles,
  };
  console.log("values: ", roles);
  const handleSubmit = async (values: FormikValues) => {
    await changeRole.mutateAsync({ id, roles: values.roles });
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setValues }) => (
          <Form>
            <div className="flex h-[200px] space-x-8 py-4">
              {allRoles.map((role) => (
                <label
                  key={role}
                  className="cursor-pointer text-xl capitalize text-white"
                >
                  <Field
                    checked={values.roles?.includes(role)}
                    type="checkbox"
                    name="role"
                    value={role}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.checked) {
                        setValues({
                          ...values,
                          roles: [...(values.roles || []), role],
                        });
                      } else {
                        setValues({
                          ...values,
                          roles: values.roles?.filter((r) => r !== role),
                        });
                      }
                    }}
                    className="mr-4 h-5 w-5 accent-emerald-500"
                  />
                  {role}
                </label>
              ))}
            </div>
            <div className="mt-4 flex">
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 px-4 py-2 text-white/90 shadow-lg shadow-green-600/30 transition-all duration-200 hover:bg-green-500 hover:text-white"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditRoleForm;
