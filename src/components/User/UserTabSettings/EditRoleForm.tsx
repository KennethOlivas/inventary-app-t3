import { api } from "@/utils/api";
import type { FormikValues } from "formik";
import { Field, Form, Formik } from "formik";
import { RoleInput } from "prisma/inputs";
import type { FC } from "react";
import React from "react";
import { useNotification } from "react-hook-notification";

type Props = {
  id: string;
  roleId?: string | null;
  refetch?: () => void;
};

const EditRoleForm: FC<Props> = ({ id, roleId, refetch }) => {
  const notification = useNotification();
  const { data: roles } = api.role.all.useQuery();
  const changeRole = api.user.addRole.useMutation({
    onSuccess: () => {
      notification.success({
        text: "Role change successfully",
        position: "bottom-right",
        theme: "dark",
      });
      refetch?.();
    },
  });
  const initialValues = {
    role: "",
  };

  const handleSubmit = async (values: FormikValues) => {
    const { role } = values;

    await changeRole.mutateAsync({
      id,
      role: {
        id: role,
      },
    });
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <label
            htmlFor="role"
            className="text-md mb-2 block font-medium text-gray-50"
          >
            Role
          </label>
          <Field
            defaultValue={roleId}
            name="role"
            as="select"
            className="block w-full rounded-lg border-2 border-indigo-500 bg-neutral-800 p-2.5 text-sm text-gray-50 focus:border-indigo-700 focus:ring-blue-700"
          >
            {roles?.map((rol) => (
              <option key={rol.id} value={rol.id} className="text-gray-50">
                {rol.name}
              </option>
            ))}
          </Field>
          <div className="mt-4 flex">
            <button
              type="submit"
              className="w-full rounded-md bg-green-600 px-4 py-2 text-white/90 shadow-lg shadow-green-600/30 transition-all duration-200 hover:bg-green-500 hover:text-white"
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditRoleForm;
