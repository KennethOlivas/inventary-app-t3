import React, { useMemo, useState } from "react";
import Modal from "@/components/Modal/Index";
import AddRoleForm from "@/components/Roles/AddRoleForm";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import { api } from "@/utils/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@prisma/client";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editRole, setEditRole] = useState(false);
  const { data, isLoading, refetch } = api.role.all.useQuery(
    undefined // no input,
  );

  console.log(data);
  const closeModal = (): void => {
    setEditRole(false);
    setIsOpen(false);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const cols = useMemo<ColumnDef<Role>[]>(
    () => [
      {
        header: "id",
        cell: (row) => row.renderValue(),
        accessorKey: "id",
      },
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
    ],
    []
  );

  const handleClick = (id: string): void => {
    setSelectedRole(data?.find((role) => role.id === id) || null);
    setEditRole(true);
  };

  if (!data) {
    return <div>no data</div>;
  }
  return (
    <div className="w-screen">
      <Breadcrumbs />
      <div className="max-w-screen-2xl-lg mx-auto  px-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-200">Roles</h1>
          <button
            onClick={openModal}
            className="flex rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
          >
            Add Role
            <PlusIcon className="ml-2 h-6 w-6" />
          </button>
        </div>
        <Modal onClose={closeModal} state={isOpen} title="Add Role">
          <AddRoleForm onAddUser={() => {}} onCancel={closeModal} />
        </Modal>

        <Modal onClose={closeModal} state={editRole} title={selectedRole?.name}>
          <div>Settings Role</div>
        </Modal>
        <Table
          data={data!}
          columns={cols}
          showFooter={false}
          loading={isLoading}
          onRowClick={handleClick}
        />
      </div>
    </div>
  );
};

export default index;
