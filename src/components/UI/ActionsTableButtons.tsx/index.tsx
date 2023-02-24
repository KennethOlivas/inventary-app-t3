import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
import React from "react";

interface Props {
  value: string;
  onClickEdit: (value: string) => void;
  onClickDelete: (value: string) => void;
}

const ActionsTableButtons: FC<Props> = ({
  onClickDelete,
  onClickEdit,
  value,
}) => {
  const handleEdit = () => {
    onClickEdit(value);
  };

  const handleDelete = () => {
    onClickDelete(value);
  };
  return (
    <div className="flex space-x-8 text-sm text-gray-300">
      <button
        onClick={handleEdit}
        className="text-gray-400 outline-none duration-150 hover:rotate-6 hover:scale-125 hover:text-indigo-200"
      >
        <PencilIcon className="h-5 w-5" />
      </button>

      <button
        onClick={handleDelete}
        className="text-gray-400 outline-none duration-150 hover:rotate-6 hover:scale-125 hover:text-indigo-200 "
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ActionsTableButtons;
