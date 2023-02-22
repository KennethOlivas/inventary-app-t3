import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="w-screen">
      <div className="max-w-screen-2xl-lg mx-auto mt-8 px-2">
        <div className="p-4">
          <div className="flex justify-end">
            <Link
              href={{
                pathname: "inventary/product/[slug]",
                query: { slug: "1" },
              }}
            >
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white">
                Go to Product
              </button>
            </Link>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl  bg-[#171717] shadow">
            <table className="min-w-full border-separate border-spacing-y-2 ">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td
                    width="50%"
                    className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-6"
                  >
                    Invoice
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-6">
                    Date
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-6">
                    Amount
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-6">
                    Status
                  </td>
                </tr>
              </thead>

              <tbody className="lg:border-gray-300">
                <tr className=" bg-transparent hover:bg-indigo-700/40">
                  <td
                    width="50%"
                    className="whitespace-no-wrap py-4 text-sm font-bold text-gray-400 sm:px-6 "
                  >
                    Standard Plan - Feb 2023
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-200">
                        07 February, 2023
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    07 February, 2022
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    $59.00
                    <div className="mt-1 ml-auto flex w-fit items-center rounded-full bg-indigo-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                      Complete
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-indigo-600 py-2 px-3 text-xs text-white">
                      Complete
                    </div>
                  </td>
                </tr>

                <tr className="">
                  <td
                    width="50%"
                    className="whitespace-no-wrap text-gray-400sm:px-6 py-4 text-sm font-bold"
                  >
                    Standard Plan - Jan 2022
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-200">
                        09 January, 2022
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    09 January, 2022
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    $59.00
                    <div className="mt-1 ml-auto flex w-fit items-center rounded-full bg-red-200 py-1 px-2 text-left font-medium text-red-500 lg:hidden">
                      Canceled
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-red-200 py-1 px-2 text-red-500">
                      Canceled
                    </div>
                  </td>
                </tr>

                <tr className="">
                  <td
                    width="50%"
                    className="whitespace-no-wrap text-gray-400sm:px-6 py-4 text-sm font-bold"
                  >
                    Basic Plan - Dec 2021
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-200">
                        15 December, 2021
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    15 December, 2021
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    $29.00
                    <div className="mt-1 ml-auto flex w-fit items-center rounded-full bg-indigo-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                      Complete
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-indigo-600 py-2 px-3 text-xs text-white">
                      Complete
                    </div>
                  </td>
                </tr>

                <tr className="">
                  <td
                    width="50%"
                    className="whitespace-no-wrap text-gray-400sm:px-6 py-4 text-sm font-bold"
                  >
                    Basic Plan - Nov 2021
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-200">
                        14 November, 2021
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    14 November, 2021
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    $29.00
                    <div className="mt-1 ml-auto flex w-fit items-center rounded-full bg-indigo-200 py-1 px-2 text-left font-medium text-indigo-500 lg:hidden">
                      Pending
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-indigo-200 py-1 px-2 text-indigo-500">
                      Pending
                    </div>
                  </td>
                </tr>

                <tr className="">
                  <td
                    width="50%"
                    className="whitespace-no-wrap text-gray-400sm:px-6 py-4 text-sm font-bold"
                  >
                    Basic Plan - Oct 2021
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-200">
                        15 October, 2021
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    15 October, 2021
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    $29.00
                    <div className="mt-1 ml-auto flex w-fit items-center rounded-full bg-indigo-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                      Complete
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-200 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-indigo-600 py-2 px-3 text-xs text-white">
                      Complete
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
