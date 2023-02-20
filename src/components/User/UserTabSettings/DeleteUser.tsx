import Modal from "@/components/Modal/Index";
import { api } from "@/utils/api";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

type Props = {
  userData: User | null | undefined;
};

const DeleteUser: FC<Props> = ({ userData }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { push } = useRouter();
  const deleteUser = api.user.deleteUser.useMutation();

  // getSession
  const { data } = useSession();

  if (data?.user.id === userData?.id) {
    return <div>you can't delete your user</div>;
  }

  const handleClick = () => {
    if (!userData?.id) {
      return;
    }
    const response = deleteUser.mutateAsync({
      id: userData?.id,
    });

    setIsOpen(true);
  };

  const handleClickOk = () => {
    push("/user");
  };

  return (
    <div className="mb-2 rounded-md border-l-8 border-red-900 bg-neutral-800">
      <div className="flex items-center">
        <div className="p-2">
          <div className="flex items-center">
            <div className="ml-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-700" />
            </div>
            <p className="px-6 py-4 text-lg font-semibold text-red-700">
              Warning in this section you can delete your account.
            </p>
          </div>
          <div className="mb-4 px-16">
            <li className="text-md text-sm font-bold text-red-200">
              name: {userData?.name}
            </li>
            <li className="text-md text-sm font-bold text-red-200">
              email: {userData?.email}
            </li>
          </div>
          <button onClick={handleClick} className="pink-button mt-8 mb-4 ml-3">
            Delete
            <TrashIcon className="ml-2 h-6 w-6" />
          </button>
        </div>
      </div>

      <Modal state={isOpen} size="md" onClose={() => {}}>
        <div className="mb-4 bg-transparent  text-emerald-400" role="alert">
          <div className="flex items-center">
            <CheckIcon className="mr-2 h-6 w-6" />
            <h3 className="text-lg font-medium">The user has been deleted</h3>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button onClick={handleClickOk} className="emerald-button px-8">
              ok
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteUser;
