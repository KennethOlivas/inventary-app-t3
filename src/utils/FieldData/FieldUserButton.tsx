import Modal from "@/components/UI/Modal/Index";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
import React, { useState } from "react";
import { api } from "../api";

type Props = {
  onFinishQuery: () => void;
};

const FieldUserButton: FC<Props> = ({ onFinishQuery }) => {
  const [modalState, setModalState] = useState(false);
  const [users, setUsers] = useState<string>("");
  const addUser = api.user.addUser.useMutation();

  const openModal = async () => {
    setModalState(true);
    for (let i = 0; i < 50; i++) {
      const radomUser = await fetch("https://randomuser.me/api/").then((res) =>
        res.json()
      );
      const { name, email } = radomUser.results[0];
      setUsers(name.first + " " + name.last);
      await addUser.mutateAsync({
        name: name.first + " " + name.last,
        email: email,
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setModalState(false);
    onFinishQuery();
  };

  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="flex rounded-lg bg-gradient-to-r from-pink-400 via-violet-500
        to-indigo-600 px-4 py-2 text-center font-medium text-white shadow-lg
        shadow-pink-500/50 outline-none
           hover:bg-gradient-to-br"
      >
        Field user data
        <CircleStackIcon className="ml-2 h-6 w-6" />
      </button>
      <Modal onClose={() => {}} title="Adding users" state={modalState}>
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div className="m-[10px] flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
                <div className="ml-2 text-4xl">
                  Processing... <div></div>
                </div>
              </div>
            </div>
            <span className="font-bold capitalize tracking-wider text-white">
              Adding: {users}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FieldUserButton;
