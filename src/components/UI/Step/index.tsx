import type { FC, ReactElement } from "react";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  isStepActive: boolean;
  icon: ReactElement;
  title: string;
  description: string;
};

const Step: FC<Props> = ({ description, icon, isStepActive, title }) => {
  return (
    <li
      className={`group relative flex items-center justify-center gap-2 p-4 text-white duration-300`}
    >
      {isStepActive && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full bg-indigo-500"
        />
      )}

      <div className="relative"> {icon}</div>

      <p className="relative leading-none">
        <strong className="block font-medium"> {title} </strong>
        <small className="mt-1"> {description} </small>
      </p>
    </li>
  );
};

export default Step;
