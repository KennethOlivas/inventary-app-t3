import { Field } from "formik";
import { FC } from "react";


type Props = {
  name: string;
  id: string;
  placeholder: string;
  type?: string;
  component?: "input" | "textarea";
};

const TextField: FC<Props> = ({ id, name, placeholder, type, component }) => {
  return (
    <div className="relative">
      <Field
        type={type || "text"}
        id={id}
        component={component || "input"}
        name={name}
        placeholder={placeholder}
        className="border-1 peer block w-full appearance-none rounded-lg border-2 border-gray-300
            bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white placeholder-transparent focus:border-blue-600 
            focus:outline-none focus:ring-0"
      />
      <label
        htmlFor={placeholder}
        className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 
            transform  bg-[#171717] px-2 text-sm text-gray-500 duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
            peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 peer-focus:text-blue-600"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default TextField;
