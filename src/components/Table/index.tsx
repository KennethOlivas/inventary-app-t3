import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import Select from "../Select";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Skeleton from "./Skeleton";
import { motion } from "framer-motion";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  showFooter: boolean;
  showNavigation?: boolean;
  loading?: boolean;
  onRowClick?: (id: string) => void;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const Table = <T extends object>({
  data,
  columns,
  showFooter = true,
  showNavigation = true,
  loading,
  onRowClick,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <motion.div
      initial={{
        opacity: 0.2,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="mt-6 overflow-hidden rounded-xl bg-[#171717] shadow"
    >
      {loading ? <Skeleton /> : null}
      <motion.table
        initial="hidden"
        animate="visible"
        variants={container}
        className="min-w-full border-separate border-spacing-y-2 "
      >
        <thead className="hidden border-b lg:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="whitespace-normal py-4 text-left text-sm font-medium capitalize text-gray-200 sm:px-6"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="lg:border-gray-300">
          {table.getRowModel().rows.map((row) => (
            <motion.tr
              variants={item}
              className=" bg-transparent hover:bg-indigo-700 transition-all duration-100"
              key={row.id}
              onClick={() => onRowClick && onRowClick(row.getValue("id"))}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="whitespace-normal py-4 text-sm font-medium text-gray-200 sm:px-6"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
        {showFooter ? (
          <tfoot className="border-t">
            {table.getFooterGroups().map((footerGroup) => (
              <tr
                key={footerGroup.id}
                className=" bg-transparent hover:bg-indigo-700"
              >
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="whitespace-normal py-4 text-left text-sm font-medium capitalize text-gray-200 sm:px-6"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        ) : null}
      </motion.table>
      {showNavigation ? (
        <div className="w-full">
          <div className="mt-5 h-2" />
          <div className="mx-4 flex items-center justify-between gap-2 pb-4">
            <div className="flex space-x-2">
              <span className="flex cursor-pointer items-center gap-1">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  value={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="mt-1 w-16 rounded-lg bg-indigo-600 p-1 py-2  text-left text-white
                shadow-md outline-none transition-all duration-150 hover:bg-indigo-500 hover:shadow-md"
                />
              </span>
              <Select
                value={table.getState().pagination.pageSize}
                options={[5, 10, 30, 40, 50]}
                onChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              />
            </div>
            <div className="flex space-x-4">
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg transition-all duration-200 hover:bg-indigo-500 hover:text-white"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg transition-all duration-200 hover:bg-indigo-500 hover:text-white"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};
export default Table;
