import { Cities } from "@prisma/client";
import { Field } from "formik";
import type { FC } from "react";
import React from "react";
import TextField from "../Inputs/TextField";

const FormInputs: FC = () => {
  return (
    <div className="my-4 flex flex-col space-y-6">
      <div className="flex space-x-6">
        <TextField id="name" name="name" placeholder="Name" type="text" />
        <TextField
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          type="text"
        />
      </div>
      <div className="flex space-x-6">
        <TextField id="email" name="email" placeholder="Email" type="email" />
        <TextField id="phone" name="phone" placeholder="Phone" type="text" />
      </div>
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
        id="address"
        name="address"
        placeholder="Address"
        type="textarea"
        component="textarea"
      />
    </div>
  );
};

export default FormInputs;
