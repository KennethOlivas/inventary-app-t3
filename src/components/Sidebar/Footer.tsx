import { EllipsisVerticalIcon, UserIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import type { FC } from "react";
import { Fragment } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";

const Footer: FC = () => {
  const { data } = useSession();
  return (
    <div className="flex-shrink-0  p-2">
      <div className="sidebar-separator-bottom flex h-full items-center py-2 sm:justify-center xl:justify-start">
        <UserIcon className="hidden h-5 w-5 xl:inline-block" />
        <div className="ml-2 block font-bold sm:hidden xl:block ">
          {data?.user.name}
        </div>
        <div className="block flex-grow sm:hidden xl:block" />
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md border-transparent bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-[#1e1e1e] hover:bg-opacity-70 focus:outline-none">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition duration-200 ease-out sclae-0"
            enterFrom="transform translate-y-4 opacity-0"
            enterTo="transform scale-100 translate-y-0 opacity-100 scale-100"
            leave="transition duration-200 ease-out translate-y-0"
            leaveFrom="transform scale-100  translate-y-0 opacity-100"
            leaveTo="transform  translate-y-4 opacity-0"
          >
            <Menu.Items className="absolute bottom-8 left-12 mt-2 origin-top-right  rounded-md bg-neutral-900 shadow-lg focus:outline-none ">
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut()}
                      className={`${
                        active ? "bg-indigo-500 text-white" : "text-gray-100"
                      } group flex w-full rounded-md px-6 py-3 text-sm`}
                    >
                      <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Footer;
