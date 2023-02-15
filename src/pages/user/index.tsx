import Table from "@/components/Table";
import { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { api } from "@/utils/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modal/Index";
import AddUserForm from "@/components/User/AddUserForm";
import { User } from "@prisma/client";
import { useRouter } from "next/router";

const index: NextPage = () => {
  const { push } = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = api.user.all.useQuery(
    undefined // no input,
  );

  const cols = useMemo<ColumnDef<User>[]>(
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
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "email",
      },
    ],
    []
  );

  if (!data) {
    return <div>no data</div>;
  }

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const onClickRow = (id: string): void => {
    push(`/user/${id}`);
  };

  return (
    <div className="w-screen">
      <div className="max-w-screen-2xl-lg mx-auto mt-8 p-4 px-2">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-200">Users</h1>
          <button
            onClick={openModal}
            className="flex rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
          >
            Add User
            <PlusIcon className="ml-2 h-6 w-6" />
          </button>
        </div>
        <Modal onClose={closeModal} state={isOpen} title="Add User">
          <AddUserForm onCancel={closeModal} onAddUser={refetch} />
        </Modal>
        <Table
          onRowClick={onClickRow}
          data={data!}
          columns={cols}
          showFooter={false}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default index;
