import React, { FC, ReactNode } from "react";
import { Tab, Transition } from "@headlessui/react";

type Props = {
  children: ReactNode;
};

const TabItem: FC<Props> = ({ children }) => {
  return (
    <>
      <Tab.Panel className="rounded-xl p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 ">
        <Transition
          appear
          show={true}
          enter="transition duration-200 ease-out"
          enterFrom="transform translate-y-4 opacity-0"
          enterTo="transform scale-100 translate-y-0 opacity-100"
          leave="transition duration-200 ease-out translate-y-0"
          leaveFrom="transform scale-100  translate-y-0 opacity-100"
          leaveTo="transform  translate-y-4 opacity-0"
        >
          <div>{children}</div>
        </Transition>
      </Tab.Panel>
    </>
  );
};

export default TabItem;
