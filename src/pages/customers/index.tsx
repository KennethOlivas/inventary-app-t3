import AddCustomerForm from "@/components/Costumer/AddCustomerForm";
import Modal from "@/components/Modal/Index";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import type { Customer } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, refetch, isLoading } = api.customer.all.useQuery();

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
        header: "Address",
        cell: (row) => row.renderValue(),
        accessorKey: "address",
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
        <Modal
          state={isOpen}
          title="add customer"
          onClose={closeModal}
          size="4xl"
        >
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
