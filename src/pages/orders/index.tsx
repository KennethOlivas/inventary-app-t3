import Loader from "@/components/Loader";
import Modal from "@/components/UI/Modal/Index";
import AddOrderForm from "@/components/Order/AddOrderForm";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { CustomerInput } from "prisma/inputs";
import { z } from "zod";
import type { Customer, Order, Shipping } from "@prisma/client";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import OrderReport from "@/components/Reports/OrderReport";
import useModal from "@/hooks/modalState";

type OrderData =
  | Order & {
      Shipping: Shipping | null;
      Customer: Customer;
    };

const index: NextPage = () => {
  const { push } = useRouter();
  const { isShowing, toggle } = useModal();
  const { data, isLoading, refetch } = api.order.all.useQuery(void 0, {
    onError: (error) => {
      push("/500?message=" + error.message + "&code=" + error.data?.code);
    },
  });

  const cols = useMemo<ColumnDef<OrderData>[]>(
    () => [
      {
        header: "id",
        cell: (row) => {
          const id = z.string().parse(row.getValue()).slice(0, 5);
          return (
            <span className=" text-sm capitalize text-gray-100">{id}...</span>
          );
        },
        accessorKey: "id",
      },
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

  const handleSubmit = () => {
    refetch();
    toggle();
  };

  const handleClickedRow = (id: string) => {
    push(`/orders/order/${id}`);
  };

  return (
    <div className="w-screen">
      <Breadcrumbs />
      <div className="max-w-screen-2xl-lg mx-auto  px-2">
        <HeaderTitle title="Orders">
          <div className="flex space-x-4">
            <OrderReport />
            <button onClick={toggle} className="indigo-button capitalize">
              add order
            </button>
          </div>
        </HeaderTitle>
        <Modal state={isShowing} onClose={toggle}>
          <AddOrderForm onClose={toggle} onSubmited={handleSubmit} />
        </Modal>
        {isLoading ? (
          <Loader />
        ) : (
          <Table
            onRowClick={handleClickedRow}
            data={data}
            columns={cols}
            showFooter={false}
          />
        )}
      </div>
    </div>
  );
};

export default index;
