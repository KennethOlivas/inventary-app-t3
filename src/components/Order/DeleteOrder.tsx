import useModal from "@/hooks/modalState";
import { api } from "@/utils/api";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useNotification } from "react-hook-notification";
import Modal from "../UI/Modal/Index";

type Props = {
  id: string;
};

const DeleteOrder: FC<Props> = ({ id }) => {
  const router = useRouter();
  const notification = useNotification();
  const deleteOrder = api.order.deleteOrder.useMutation({
    onSuccess: () => {
      notification.success({
        text: "Order deleted successfully",
        position: "bottom-right",
        theme: "dark",
      });

      router.push("/orders");
    },
  });
  const { isShowing, toggle } = useModal();

  const handleDelete = () => {
    deleteOrder.mutate({
      id,
    });
  };

  return (
    <>
      <button className="pink-button" onClick={toggle}>
        Delete
        <ExclamationTriangleIcon className="ml-2 h-6 w-6 text-white" />
      </button>
      <Modal state={isShowing} onClose={toggle}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-xl font-semibold text-pink-500">
            Are you sure you want to delete this order?
          </p>
          <div className="flex space-x-4">
            <button onClick={toggle} className="indigo-button">
              Cancel
            </button>
            <button onClick={handleDelete} className="pink-button">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteOrder;
