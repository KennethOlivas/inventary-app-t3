import Loader from "@/components/Loader";
import Modal from "@/components/UI/Modal/Index";
import AddOrderForm from "@/components/Order/AddOrderForm";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import type { Order } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

const index = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = api.order.all.useQuery();

  const cols = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        header: "id",
        cell: (row) => row.renderValue(),
        accessorKey: "id",
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
          <AddOrderForm />
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
