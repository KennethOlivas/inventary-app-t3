import Modal from "@/components/Modal/Index";
import AddProductForm from "@/components/Product/AddProductForm";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = api.product.all.useQuery(
    undefined // no input,
  );

  const cols = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "stock",
        cell: (row) => {
          const value = row.renderValue() as string;
          return <>{value}</>;
        },
        accessorKey: "stock",
      },
      {
        header: "price",
        cell: (row) => {
          const value = row.renderValue() as string;
          return <div className=" text-sm text-gray-300">$ {value}</div>;
        },
        accessorKey: "price",
      },
      {
        header: "description",
        cell: (row) => {
          const value = row.renderValue() as string;
          return (
            <div className=" text-sm text-gray-300">{value.slice(0, 100)}</div>
          );
        },
        accessorKey: "description",
      },
    ],
    []
  );

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div className="w-screen">
      <Breadcrumbs />
      <div className="max-w-screen-2xl-lg mx-auto px-2">
        <HeaderTitle title="Products">
          <div className="flex space-x-4">
            <button onClick={openModal} className="indigo-button">
              New Product
            </button>
          </div>
        </HeaderTitle>
        <Modal
          state={isOpen}
          title="New Product"
          size="md"
          onClose={closeModal}
        >
          <AddProductForm onAddUser={refetch} onCancel={closeModal} />
        </Modal>
        <Table
          data={data}
          columns={cols}
          showFooter={false}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default index;
