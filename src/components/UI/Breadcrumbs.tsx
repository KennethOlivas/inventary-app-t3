import { useRouter } from "next/router";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import React from "react";
import Link from "next/link";

const Breadcrumbs = () => {
  const { asPath } = useRouter();
  const path = asPath.split("/").reduce((acc, curr) => {
    if (curr === "") {
      return ["/"];
    }
    return [...acc, `${acc[acc.length - 1]}${curr}/`];
  }, [] as string[]);

  return (
    <section className="p-4 px-2">
      <nav
        className="flex rounded-lg bg-[#171717] px-5 py-3 text-gray-700"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {path.map((item, index, arr) => {
            if (index === 0) {
              return (
                <li className="inline-flex items-center" key={index}>
                  <HomeIcon
                    className="mr-4 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
              );
            }
            return (
              <li key={index}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  <Link
                    href={`${item}`}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ml-2"
                  >
                    {item.split("/")[item.split("/").length - 2]}
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
};

export default Breadcrumbs;
