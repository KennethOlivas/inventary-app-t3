import Loader from "@/components/Loader";
import Modal from "@/components/UI/Modal/Index";
import AddOrderForm from "@/components/Order/AddOrderForm";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { CustomerInput } from "prisma/inputs";
import { z } from "zod";
import type { Customer, Order, Shipping } from "@prisma/client";

type OrderData =
  | Order & {
      Shipping: Shipping | null;
      Customer: Customer;
    };

const index = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = api.order.all.useQuery();

  const cols = useMemo<ColumnDef<OrderData>[]>(
    () => [
      {
        header: "invoce",
        cell: (row) => {
          const invoiceNumber = z.string().parse(row.getValue());
          return (
            <span className=" text-sm capitalize text-gray-100">
              # {invoiceNumber}
            </span>
          );
        },
        accessorKey: "invoiceNumber",
      },
      {
        header: "customer",
        cell: (row) => {
          const customer = CustomerInput.parse(row.getValue());
          return (
            <span className=" text-sm capitalize text-gray-100">
              {customer.name} {customer.lastName}
            </span>
          );
        },
        accessorKey: "Customer",
      },
      {
        header: "status",
        cell: (row) => row.renderValue(),
        accessorKey: "status",
      },
      {
        header: "total",
        cell: (row) => {
          const total = z.number().parse(row.getValue());
          return (
            <span className=" text-sm capitalize text-gray-100">$ {total}</span>
          );
        },
        accessorKey: "total",
      },
    ],
    []
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="w-screen">
      <Breadcrumbs />
      <div className="max-w-screen-2xl-lg mx-auto  px-2">
        <HeaderTitle title="Orders">
          <button onClick={openModal} className="indigo-button capitalize">
            add order
          </button>
        </HeaderTitle>

        <Modal state={showModal} onClose={closeModal}>
          <AddOrderForm onClose={closeModal} onSubmitted={closeModal} />
        </Modal>
        {isLoading ? (
          <Loader />
        ) : (
          <Table data={data} columns={cols} showFooter={false} />
        )}
      </div>
    </div>
  );
};

export default index;
