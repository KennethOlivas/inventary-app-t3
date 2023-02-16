import TextField from "@/components/Inputs/TextField";
import Modal from "@/components/Modal/Index";
import Alert from "@/components/UI/Alert";
import { api } from "@/utils/api";
import { User } from "@prisma/client";
import { Form, Formik } from "formik";
import { UserInput } from "prisma/inputs";
import React, { FC, useMemo, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

const schema = UserInput.pick({
  email: true,
  name: true,
  position: true,
  description: true,
}).partial();

type Props = {
  userData: User | null | undefined;
};

const EditUserForm: FC<Props> = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const addUser = api.user.editUser.useMutation({
    onSuccess() {
      setIsOpen(true);
    },
    onError() {
      console.log("error");
    },
  });

  const inicialValues = useMemo(() => {
    return {
      id: userData!.id,
      name: userData?.name || "",
      email: userData?.email || "",
      position: userData?.position || "",
      description: userData?.description || "",
    };
  }, []);

  const handleSubmit = (values: typeof inicialValues) => {
    addUser.mutate({
      data: {
        description: values.description,
        email: values.email,
        name: values.name,
        position: values.position,
      },
      id: userData!.id,
    });
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };
  return (
    <div>
      <p className="mb-4 text-2xl font-bold capitalize text-white">
        General Information
      </p>
      <Formik
        initialValues={inicialValues}
        validationSchema={toFormikValidationSchema(schema)}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col space-y-8">
          <TextField id="name" name="name" placeholder="Name" />
          <TextField type="email" id="email" name="email" placeholder="Email" />
          <TextField id="position" name="position" placeholder="Position" />
          <TextField
            component="textarea"
            type="textarea"
            id="description"
            name="description"
            placeholder="Description"
          />

          <div className="flex flex-col-reverse">
            <button
              type="submit"
              className="rounded-md bg-green-600 px-4 py-2 text-white/90 shadow-lg shadow-green-600/30 transition-all duration-200 hover:bg-green-500 hover:text-white"
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
      <Modal state={isOpen} onClose={closeModal}>
        <Alert
          type="success"
          title="User Updated"
          mesaage="The User has been updated succesfully "
        />
      </Modal>
    </div>
  );
};

export default EditUserForm;
