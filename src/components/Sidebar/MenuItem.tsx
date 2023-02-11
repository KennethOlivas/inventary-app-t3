import clsx from "clsx";
import { FC } from "react";
import {
  Squares2X2Icon,
  SwatchIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { onChangeMenu } from "@/store/features/Sidebar/sideBarSlice";
import { SideBarItem } from "@/common/sideBarData";

const Icons = [
  <Squares2X2Icon className="h-5 w-5" />,
  <CubeIcon className="h-5 w-5" />,
  <WrenchScrewdriverIcon className="h-5 w-5" />,
  <UsersIcon className="h-5 w-5" />,
];
type Props = {
  item: SideBarItem;
  selected: string;
};

const MenuItem: FC<Props> = ({
  item: { id, title, notifications, href },
  selected,
}) => {
  const dispatch = useDispatch();
  return (
    <Link href={href ?? "/"}>
      <div
        className={clsx(
          "flex w-full cursor-pointer items-center justify-start py-2 px-3 sm:justify-center sm:px-0 xl:justify-start  xl:px-3",
          selected === id ? "sidebar-item-selected" : "sidebar-item"
        )}
        onClick={() => dispatch(onChangeMenu(id))}
      >
        {Icons[Number(id)]}
        <div className="ml-2 block sm:hidden xl:block">{title}</div>
        <div className="block flex-grow sm:hidden xl:block" />
        {notifications && (
          <div className="mr-2 flex h-5  w-5 items-center justify-center rounded-full bg-indigo-600 sm:hidden xl:flex">
            <div className="text-sm text-white">{notifications}</div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MenuItem;
