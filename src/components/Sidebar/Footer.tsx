import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="flex-shrink-0  p-2">
      <div className="sidebar-separator-bottom flex h-full items-center py-2 sm:justify-center xl:justify-start">
        <p>icon</p>
        <div className="ml-2 block font-bold sm:hidden xl:block ">
          kenneth Olivas
        </div>
        <div className="block flex-grow sm:hidden xl:block" />
        <div className="relative inline-block text-left">
          <button className="inline-flex w-full justify-center rounded-md border-transparent bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-[#1e1e1e] hover:bg-opacity-70 focus:outline-none">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
