import type { NextPage } from "next";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Bars4Icon } from "@heroicons/react/24/outline";

type Props = {
  children: ReactElement;
};

const Layout: NextPage<Props> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!data) {
      router.push("/login");
    }
  }, [data]);

  const handleChanges = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {data ? (
        <div className="flex flex-col">
          <div className="mx-4 mt-2 flex justify-between space-x-4 sm:hidden">
            <div>
              <p>{data.user.name}</p>
            </div>
            <button className="block sm:hidden" onClick={handleChanges}>
              <Bars4Icon className="h-5 w-5" />
            </button>
          </div>
          <Sidebar onSidebarHide={handleChanges} showSidebar={showSidebar} />
          <div className="flex w-full">
            <div className="hidden h-screen w-full flex-shrink-0 sm:block sm:w-20 xl:w-60" />
            {children}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Layout;
