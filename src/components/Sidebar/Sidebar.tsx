import { sidebarItems, Admin } from "@/common/sideBarData";
import { ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect } from "react";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeMenu,
  selectMenu,
} from "@/store/features/Sidebar/sideBarSlice";
import { useRouter } from "next/router";
import { Disclosure, Transition } from "@headlessui/react";
import Collapse from "../UI/Collapse";

type Props = {
  onSidebarHide: () => void;
  showSidebar: boolean;
};

const Sidebar: FC<Props> = ({ onSidebarHide, showSidebar }) => {
  const sidebarIndex = useSelector(selectMenu);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = router.pathname.split("/")[1] || "dashboard";

  useEffect(() => {
    const getIndexOfPath = () => {
      const index = sidebarItems
        .map((item) => item.items)
        .flat()
        .findIndex((item) => item.href === `/${path}`);

      if (index === undefined) return "0";
      return index === -1 ? "0" : index.toString();
    };
    dispatch(onChangeMenu(getIndexOfPath()));
  }, [router.pathname]);

  return (
    <div
      className={clsx(
        "bg-card fixed inset-y-0 left-0 z-10 w-full flex-col transition-all duration-200 ease-in-out sm:flex sm:w-20 xl:w-60",
        showSidebar ? "flex" : "hidden"
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2 duration-300 ease-out sm:transition-none">
        <div className="sidebar-separator-top flex h-full items-center p-2 sm:justify-center xl:justify-start">
          <p>icon</p>
          <div className="ml-2 block text-xl font-bold text-white sm:hidden xl:block">
            React
          </div>
          <div className="flex-grow sm:hidden xl:block" />
          <button className="block sm:hidden" onClick={onSidebarHide}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-grow flex-col ">
        <div className="hidden h-24 w-full flex-shrink-0 p-3 sm:block sm:h-20 xl:h-24">
          <div className="bg-sidebar-card-top flex h-full w-full items-center justify-start rounded-xl px-3 sm:justify-center sm:px-0 xl:justify-start xl:px-3">
            <p>icon</p>
            <div className="ml-3 block sm:hidden xl:block">
              <div className="text-sm font-bold text-white">Data</div>
              <div className="text-sm">General Item</div>
            </div>
            <div className="block flex-grow sm:hidden xl:block" />
            <p>icon</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          {sidebarItems.map((sidebar) => (
            <Collapse key={sidebar.title} title={sidebar.title}>
              {sidebar.items.map((item) => (
                <MenuItem key={item.id} item={item} selected={sidebarIndex} />
              ))}
            </Collapse>
          ))}
        </div>
        <div className="flex-grow" />
      </div>
      <Footer />
    </div>
  );
};

export default Sidebar;
