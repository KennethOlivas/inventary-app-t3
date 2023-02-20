import React, { useMemo, useState } from "react";
import Modal from "@/components/Modal/Index";
import AddRoleForm from "@/components/Roles/AddRoleForm";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import { api } from "@/utils/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@prisma/client";
import HeaderTitle from "@/components/UI/HeaderTitle";

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
        <HeaderTitle title="Roles">
          <button onClick={openModal} className="indigo-button">
            Add Role
            <PlusIcon className="ml-2 h-6 w-6" />
          </button>
        </HeaderTitle>
        <Modal onClose={closeModal} state={isOpen} title="Add Role">
          <AddRoleForm onAddUser={refetch} onCancel={closeModal} />
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
