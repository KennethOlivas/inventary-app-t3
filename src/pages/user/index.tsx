import Table from "@/components/Table";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { api } from "@/utils/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/UI/Modal/Index";
import AddUserForm from "@/components/User/AddUserForm";
import type { User } from "@prisma/client";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import Loader from "@/components/Loader";
import UserReport from "@/components/Reports/UserReport";

const index: NextPage = () => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = api.user.all.useQuery(
    undefined, // no input,
    {
      onError: (error) => {
        push("/500?message=" + error.message + "&code=" + error.data?.code);
      },
    }
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
      <Breadcrumbs />
      <div className="max-w-screen-4xl mx-auto mb-4 px-2">
        <HeaderTitle title="Users">
          <div className="flex space-x-4">
            <UserReport />
            <button
              onClick={openModal}
              className="flex rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
            >
              Add User
              <PlusIcon className="ml-2 h-6 w-6" />
            </button>
          </div>
        </HeaderTitle>
        <Modal onClose={closeModal} state={isOpen} title="Add User">
          <AddUserForm onCancel={closeModal} onAddUser={refetch} />
        </Modal>

        {isLoading ? (
          <Loader />
        ) : (
          <Table
            onRowClick={onClickRow}
            data={data}
            columns={cols}
            showFooter={false}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default index;
