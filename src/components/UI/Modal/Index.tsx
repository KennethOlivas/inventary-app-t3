import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import React, { Fragment } from "react";

type Props = {
  title?: string;
  state: boolean;
  onClose: () => void;
  children: ReactNode;
  description?: string;
};

const Modal: FC<Props> = ({ onClose, state, title, children, description }) => {
  return (
    <>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={clsx(
                    "transform overflow-hidden rounded-2xl bg-[#171717] p-6 text-left align-middle shadow-xl transition-all"
                  )}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium capitalize leading-6 text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="mt-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
