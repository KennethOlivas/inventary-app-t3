import Modal from "@/components/Modal/Index";
import AddRoleForm from "@/components/Roles/AddRoleForm";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const index = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = (): void => {
    setIsOpen(false);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };
  return (
    <div className="w-screen">
      <Breadcrumbs />
      <div className="max-w-screen-2xl-lg mx-auto  px-2">
        <h1 className="text-3xl font-bold text-gray-200">Roles</h1>

        <button
          onClick={openModal}
          className="flex rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
        >
          Add User
          <PlusIcon className="ml-2 h-6 w-6" />
        </button>
      </div>
      <Modal onClose={closeModal} state={isOpen} title="Add Role">
        <AddRoleForm onAddUser={() => {}} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default index;
