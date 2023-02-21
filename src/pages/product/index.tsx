import Modal from "@/components/Modal/Index";
import UpsertProductForm from "@/components/Product/UpsertProductForm";
import Table from "@/components/Table";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Product } from "@prisma/client";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

const index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading, refetch } = api.product.all.useQuery();
  const [editedProductId, setEditedProductId] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const deleteProduct = api.product.deleteProduct.useMutation();

  const onClickDelete = async (id: string) => {
    await deleteProduct.mutateAsync({
      id,
    });
    refetch();
  };

  const onClickEdit = useCallback((id: string) => {
    setEditedProductId(id);
    setIsEdit(true);
    setIsOpen(true);
  }, []);

  const clearEdit = useCallback(() => {
    setIsEdit(false);
    setEditedProductId("");
    refetch();
  }, []);

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

      {
        header: "Actions",
        cell: (row: CellContext<Product, unknown>) => {
          const value = row.renderValue() as string;
          return (
            <div className="flex space-x-8 text-sm text-gray-300">
              <button
                onClick={() => onClickEdit(value)}
                className="text-gray-400 duration-150 hover:rotate-6 hover:scale-125 hover:text-indigo-200"
              >
                <PencilIcon className="h-5 w-5" />
              </button>

              <button
                onClick={() => onClickDelete(value)}
                className="text-gray-400 duration-150 hover:rotate-6 hover:scale-125 hover:text-indigo-200"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          );
        },
        accessorKey: "id",
      },
    ],
    []
  );

  if (!data) {
    return <div>no data</div>;
  }

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
    clearEdit();
  };

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
          title={isEdit ? "Edit Product" : "Add Product"}
          size="md"
          onClose={closeModal}
        >
          <UpsertProductForm
            isEdit={isEdit}
            productId={editedProductId}
            onAddUser={clearEdit}
            onCancel={closeModal}
          />
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
