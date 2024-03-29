import AddCustomerForm from "@/components/Costumer/AddCustomerForm";
import Modal from "@/components/UI/Modal/Index";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import type { Customer } from "@prisma/client";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import ActionsTableButtons from "@/components/UI/ActionsTableButtons.tsx";

const index: NextPage = () => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data, refetch, isLoading } = api.customer.all.useQuery(void 0, {
    onError: (error) => {
      push("/500?message=" + error.message + "&code=" + error.data?.code);
    },
  });

  const deleteCustomer = api.customer.deleteCustomer.useMutation();

  const onClickDelete = async (id: string) => {
    await deleteCustomer.mutateAsync({
      id,
    });
    refetch();
  };

  const cols = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "Last Name",
        cell: (row) => row.renderValue(),
        accessorKey: "lastName",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "email",
      },
      {
        header: "Phone",
        cell: (row) => row.renderValue(),
        accessorKey: "phone",
      },
      {
        header: "City",
        cell: (row) => row.renderValue(),
        accessorKey: "city",
      },
      {
        header: "Address",
        cell: (row) => row.renderValue(),
        accessorKey: "address",
      },
      {
        header: "Actions",
        cell: (row: CellContext<Customer, unknown>) => {
          const value = row.renderValue() as string;
          return (
            <ActionsTableButtons
              onClickDelete={onClickDelete}
              onClickEdit={() => {}}
              value={value}
            />
          );
        },
        accessorKey: "id",
      },
    ],
    []
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!data) {
    return <div>no data</div>;
  }
  return (
    <div className="w-screen">
      <Breadcrumbs />
      <div className="max-w-screen-4xl mx-auto mb-4 px-2">
        <HeaderTitle title="Customers">
          <button onClick={openModal} className="indigo-button">
            Add Customer
            <PlusIcon className="ml-2 h-5 w-5" />
          </button>
        </HeaderTitle>
        <Modal state={isOpen} title="add customer" onClose={closeModal}>
          <AddCustomerForm onAddUser={refetch} onCancel={closeModal} />
        </Modal>
        <Table
          data={data}
          loading={isLoading}
          showFooter={false}
          columns={cols}
        />
      </div>
    </div>
  );
};

export default index;
