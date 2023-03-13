import useDashboardData from "@/hooks/useDashboardData";
import {
  ArchiveBoxXMarkIcon,
  CubeIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Triangle } from "react-loader-spinner";

const Cards = () => {
  const {
    isLoading,
    totalCanceledOrders,
    totalCustomers,
    totalOrders,
    totalProducts,
  } = useDashboardData();
  console.log(totalProducts);

  return (
    <div className="flex flex-wrap p-4">
      <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
        <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-neutral-900 text-neutral-100 shadow-lg xl:mb-0">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                <h5 className="text-xs font-bold uppercase text-gray-100">
                  Total Orders
                </h5>
                <span className="text-blueGray-700 text-xl font-semibold">
                  {isLoading ? (
                    <Triangle
                      height="20"
                      width="20"
                      wrapperClass="mt-2"
                      color="#4fa94d"
                      ariaLabel="triangle-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    totalOrders
                  )}
                </span>
              </div>
              <div className="relative w-auto flex-initial pl-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 p-3 text-center text-white shadow-md shadow-emerald-800/40">
                  <TruckIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-100">
              <span className="mr-2 text-emerald-500">
                <i className="fas fa-arrow-up"></i> 3.48%
              </span>
              <span className="whitespace-nowrap">Since last month</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
        <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-neutral-900 text-neutral-100 shadow-lg xl:mb-0">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                <h5 className="text-xs font-bold uppercase text-gray-100">
                  Total Customer
                </h5>
                <span className="text-xl font-semibold text-gray-100">
                  {isLoading ? (
                    <Triangle
                      height="20"
                      width="20"
                      wrapperClass="mt-2"
                      color="#4fa94d"
                      ariaLabel="triangle-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    totalCustomers
                  )}
                </span>
              </div>
              <div className="relative w-auto flex-initial pl-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 p-3 text-center text-white shadow-md shadow-orange-800/40">
                  <UserGroupIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-100">
              <span className="mr-2 text-red-500">
                <i className="fas fa-arrow-down"></i> - 3.48%
              </span>
              <span className="whitespace-nowrap">Since last week</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
        <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-neutral-900 text-neutral-100 shadow-lg xl:mb-0">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                <h5 className="text-xs font-bold uppercase text-gray-400">
                  Products
                </h5>
                <span className="text-xl font-semibold text-gray-100">
                  {isLoading ? (
                    <Triangle
                      height="20"
                      width="20"
                      wrapperClass="mt-2"
                      color="#4fa94d"
                      ariaLabel="triangle-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    totalProducts
                  )}
                </span>
              </div>
              <div className="relative w-auto flex-initial pl-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 p-3 text-center text-white shadow-md shadow-indigo-800/40">
                  <CubeIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-100">
              <span className="mr-2 text-orange-500">
                <i className="fas fa-arrow-down"></i> 1.10%
              </span>
              <span className="whitespace-nowrap">Since yesterday</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
        <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-neutral-900 text-neutral-100 shadow-lg xl:mb-0">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                <h5 className="text-xs font-bold uppercase text-gray-100">
                  Cancelled Orders
                </h5>
                <span className="text-blueGray-700 text-xl font-semibold">
                  {isLoading ? (
                    <Triangle
                      height="20"
                      width="20"
                      wrapperClass="mt-2"
                      color="#4fa94d"
                      ariaLabel="triangle-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    totalCanceledOrders
                  )}
                </span>
              </div>
              <div className="relative w-auto flex-initial pl-4">
                <div className="bg-lightBlue-500 inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 p-3 text-center text-white  shadow-md shadow-pink-800/40">
                  <ArchiveBoxXMarkIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-100">
              <span className="mr-2 text-emerald-500">
                <i className="fas fa-arrow-up"></i> 12%
              </span>
              <span className="whitespace-nowrap">Since last month</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
