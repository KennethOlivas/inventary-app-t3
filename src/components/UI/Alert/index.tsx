import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  type: "success" | "error" | "warning" | "info";
  title: string;
  mesaage: string;
};

const Alert: FC<Props> = ({ mesaage, title, type }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>
        {type === "success" && (
          <CheckCircleIcon className="h-12 w-12 text-green-500" />
        )}
        {type === "error" && (
          <ExclamationCircleIcon className="h-12 w-12 text-pink-500" />
        )}
        {type === "warning" && (
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
        )}
        {type === "info" && (
          <InformationCircleIcon className="h-12 w-12 text-indigo-500" />
        )}
      </div>
      <div>
        <h2 className="text-center text-lg  font-semibold text-gray-50">{title}</h2>
        <p className="mt-2 text-center text-sm leading-relaxed text-gray-100">
          {mesaage}
        </p>
      </div>
    </div>
  );
};

export default Alert;
