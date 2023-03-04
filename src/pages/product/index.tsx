import Loader from "@/components/Loader";
import Modal from "@/components/UI/Modal/Index";
import UpsertProductForm from "@/components/Product/UpsertProductForm";
import Table from "@/components/Table";
import ActionsTableButtons from "@/components/UI/ActionsTableButtons.tsx";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import type { Product } from "@prisma/client";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";

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
        cell: (row) => {
          const value = row.renderValue() as string;
          return (
            <span className=" text-sm capitalize text-gray-300">{value}</span>
          );
        },
        accessorKey: "name",
      },
      {
        header: "price",
        cell: (row) => {
          const value = row.renderValue() as string;
          return <span className=" text-sm text-gray-300">$ {value}</span>;
        },
        accessorKey: "price",
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
        header: "Status",
        cell: (row) => {
          const value = row.renderValue() as number;
          return (
            <span
              className={`inline-block whitespace-nowrap rounded-md
             py-1 px-2 text-center align-baseline text-xs 
            font-bold uppercase ${
              value > 0
                ? "bg-emerald-200 text-emerald-800"
                : "bg-pink-200 text-pink-800"
            }`}
            >
              {value > 0 ? "In Stock" : "Out of Stock"}
            </span>
          );
        },
        accessorKey: "stock",
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
            <ActionsTableButtons
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
              value={value}
            />
          );
        },
        accessorKey: "id",
      },
    ],
    []
  );

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
          onClose={closeModal}
        >
          <UpsertProductForm
            isEdit={isEdit}
            productId={editedProductId}
            onAddUser={clearEdit}
            onCancel={closeModal}
          />
        </Modal>
        {isLoading ? (
          <Loader />
        ) : (
          <Table
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
