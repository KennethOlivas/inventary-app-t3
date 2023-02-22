import type { FC, ReactNode } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  items: string[];
  children: ReactNode;
};

const Tabs: FC<Props> = ({ children, items }) => {
  return (
    <div className="w-full px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {items.map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-100",
                  " focus:outline-none ",
                  selected
                    ? "bg-indigo-600 text-blue-100 shadow"
                    : "text-blue-100 hover:bg-indigo-600/40 hover:text-white"
                )
              }
            >
              {item}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
