import { sidebarItems } from "@/common/sideBarData";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, useEffect } from "react";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeMenu,
  selectMenu,
} from "@/store/features/Sidebar/sideBarSlice";
import { useRouter } from "next/router";

type Props = {
  onSidebarHide: () => void;
  showSidebar: boolean;
};

const Sidebar: FC<Props> = ({ onSidebarHide, showSidebar }) => {
  const sidebarIndex = useSelector(selectMenu);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getIndexOfPath = () => {
      const index = sidebarItems[0]?.findIndex((item) => {
        return item.href === router.pathname;
      });
      if (index === undefined) return "0";
      return index === -1 ? "0" : index.toString();
    };
    console.log(getIndexOfPath());

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
      <div className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
        <div className="hidden h-24 w-full flex-shrink-0 p-3 sm:block sm:h-20 xl:h-24">
          <div className="bg-sidebar-card-top flex h-full w-full items-center justify-start rounded-xl px-3 sm:justify-center sm:px-0 xl:justify-start xl:px-3">
            <p>icon</p>
            <div className="ml-3 block sm:hidden xl:block">
              <div className="text-sm font-bold text-white">Sales House</div>
              <div className="text-sm">General Item</div>
            </div>
            <div className="block flex-grow sm:hidden xl:block" />
            <p>icon</p>
          </div>
        </div>
        {sidebarItems[0]?.map((i) => (
          <MenuItem key={i.id} item={i} selected={sidebarIndex} />
        ))}
        <div className="mt-8 mb-0 block px-3 font-bold sm:hidden xl:block">
          SHORTCUTS
        </div>
        {sidebarItems[1]?.map((i) => (
          <MenuItem key={i.id} item={i} selected={sidebarIndex} />
        ))}
        <div className="flex-grow" />
        <div className="hidden h-28 w-full p-3 sm:block sm:h-20 xl:h-32">
          <div
            className="h-full w-full overflow-hidden rounded-xl px-3 sm:px-0 xl:px-3"
            style={{
              backgroundImage:
                "url('https://assets.codepen.io/3685267/res-react-dash-usage-card.svg')",
            }}
          >
            <div className="block pt-3 sm:hidden xl:block">
              <div className="text-sm font-bold text-gray-300">Used Space</div>
              <div className="text-xs text-gray-500">
                Admin updated 09:12 am November 08,2022
              </div>
              <div className="w-full text-gray-300">
                <p>content</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sidebar;
