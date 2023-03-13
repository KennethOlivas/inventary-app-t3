import clsx from "clsx";
import type { FC } from "react";
import {
  Squares2X2Icon,
  WrenchScrewdriverIcon,
  UsersIcon,
  CubeIcon,
  StarIcon,
  LockClosedIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { onChangeMenu } from "@/store/features/Sidebar/sideBarSlice";

// create a new array of icons name + Icon property
const Icons = [
  { name: "Squares2X2Icon", Icon: <Squares2X2Icon className="h-5 w-5" /> },
  { name: "CubeIcon", Icon: <CubeIcon className="h-5 w-5" /> },
  { name: "StarIcon", Icon: <StarIcon className="h-5 w-5" /> },
  {
    name: "WrenchScrewdriverIcon",
    Icon: <WrenchScrewdriverIcon className="h-5 w-5" />,
  },
  {
    name: "TruckIcon",
    Icon: <TruckIcon className="h-5 w-5" />,
  },
  { name: "UsersIcon", Icon: <UsersIcon className="h-5 w-5" /> },
  { name: "LockClosedIcon", Icon: <LockClosedIcon className="h-5 w-5" /> },
];

type Props = {
  item: {
    id: string;
    title: string;
    notifications: number | boolean;
    href: string;
    icon?: string;
  };
  selected: string;
};

const MenuItem: FC<Props> = ({ item, selected }) => {
  const { id, title, notifications, href, icon } = item;

  const dispatch = useDispatch();
  return (
    <Link href={href ?? "/"}>
      <div className="group relative inline-block w-full">
        <button
          key={id}
          className={clsx(
            "flex w-full cursor-pointer items-center justify-start py-4 px-3 sm:justify-center sm:px-0 xl:justify-start  xl:px-3",
            selected === id ? "sidebar-item-selected" : "sidebar-item"
          )}
          onClick={() => dispatch(onChangeMenu(id))}
        >
          {Icons.map((item) => {
            if (item.name === icon) {
              return <div key={item.name}>{item.Icon}</div>;
            }
          })}

          <div className="ml-2 block sm:hidden xl:block">{title}</div>
          <div className="block flex-grow sm:hidden xl:block" />
          {notifications && (
            <div className="mr-2 flex h-5  w-5 items-center justify-center rounded-full bg-indigo-600 sm:hidden xl:flex">
              <div className="text-sm text-white">{notifications}</div>
            </div>
          )}
        </button>
        <div className="absolute -right-12 top-1/2 flex -translate-y-1/2  whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 duration-150 group-hover:opacity-100 xl:hidden">
          <span className="absolute left-[-3px] top-1/2  h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black"></span>
          {title}
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
