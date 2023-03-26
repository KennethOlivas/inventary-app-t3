import { Field } from "formik";
import type { FC } from "react";

type Props = {
  name: string;
  id: string;
  placeholder: string;
  type?: "text" | "number" | "email" | "password" | "date" | "textarea";
  component?: "input" | "textarea";
  error?: string;
  touched?: boolean;
};

const TextField: FC<Props> = ({
  id,
  name,
  placeholder,
  type,
  component,
  error,
  touched,
}) => {
  return (
    <div className="relative w-full">
      <Field
        type={type || "text"}
        id={id}
        component={component || "input"}
        name={name}
        placeholder={placeholder}
        className={`border-1 peer block w-full appearance-none rounded-lg border-2 border-gray-300
            bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white placeholder-transparent focus:border-indigo-600 
            focus:outline-none focus:ring-0 ${
              error && touched && "border-red-500"
            }`}
      />
      <label
        htmlFor={placeholder}
        className={`absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 
            transform  bg-[#171717] px-2 text-sm text-gray-500 duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
            peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 peer-focus:text-indigo-600 ${
              error && touched && "text-red-600"
            }`}
      >
        {placeholder}
      </label>
      {error && touched && (
        <div className="absolute right-3 top-4 text-xs italic text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextField;
