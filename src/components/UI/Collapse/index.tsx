import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Collapse: FC<Props> = ({ children }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex w-full items-center justify-between rounded-lg
              px-4 py-2 text-left text-xl font-bold tracking-wider outline-none duration-150 hover:bg-neutral-800 hover:text-white ${
                open ? "text-white" : ""
              }  `}
          >
            <span>Main</span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-white transition-all duration-200 ease-out`}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-10 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-10 opacity-0"
          >
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Collapse;
