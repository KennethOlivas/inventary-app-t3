import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import type { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const Collapse: FC<Props> = ({ children, title }) => {
  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex items-center justify-center  rounded-lg px-4 py-2
              text-left font-bold tracking-wider outline-none duration-150 hover:bg-neutral-800 hover:text-white xl:justify-between ${
                open ? "text-white" : ""
              }  `}
          >
            <span className="hidden xl:inline-block  ">{title}</span>
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
            <Disclosure.Panel className="mt-2">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Collapse;
