import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, FilterFn, SortingState } from "@tanstack/react-table";
import Select from "../Select";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Skeleton from "./Skeleton";
import { motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ReactTableProps<T extends object> {
  data: T[] | undefined;
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
  const router = useRouter();
  // get the current page from the query string
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  if (!data) {
    return null;
  }

  const globalFilterFn: FilterFn<T> = (row, columnId, filterValue: string) => {
    const search = filterValue.toLowerCase();

    let value = row.getValue(columnId) as string;
    if (typeof value === "number") value = String(value);

    return value?.toLowerCase().includes(search);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
  });

  const onChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page: page + 1,
      },
    });
  };

  const onChangePageSize = (pageSize: number) => {
    router.push({
      query: {
        ...router.query,
        pageSize,
      },
    });
  };

  const onChangeSorting = (sorting: SortingState) => {
    console.log(
      sorting.map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`).join(",")
    );

    router.push({
      query: {
        ...router.query,
        sort: sorting
          .map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`)
          .join(","),
      },
    });
  };

  const onChangeGlobalFilter = (globalFilter: string) => {
    router.push({
      query: {
        ...router.query,
        globalFilter,
      },
    });
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      table.setGlobalFilter(undefined);
      onChangeGlobalFilter && onChangeGlobalFilter("");
      return;
    }
    table.setGlobalFilter(event.target.value);
    onChangeGlobalFilter && onChangeGlobalFilter(table.getState().globalFilter);
  };

  useEffect(() => {
    const { page, pageSize, globalFilter } = router.query;

    table.setPageSize(Number(pageSize) || 10);
    table.setPageIndex(Number(page) - 1 || 0);
    table.setGlobalFilter(globalFilter as string);
  }, [table]);
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
      className="relative mt-6 overflow-y-auto rounded-xl bg-[#171717] shadow"
    >
      <div className="group relative mx-4 my-4 flex">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 group-focus:text-indigo-500 " />
        </div>
        <input
          value={globalFilter ?? ""}
          onChange={onChangeInput}
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          className="border-1 peer block w-full appearance-none rounded-lg border-2 border-transparent bg-transparent px-2.5
            pl-10 pb-4 pt-4 text-sm text-white placeholder-gray-500  hover:border-gray-600 focus:border-indigo-600 
            focus:outline-none focus:ring-0 "
        />
      </div>
      {loading ? <Skeleton /> : null}
      <motion.table
        initial="hidden"
        animate="visible"
        variants={container}
        className="whitespace-no-wrap table-striped relative  w-full min-w-full table-auto border-separate border-spacing-y-2"
      >
        <thead className="hidden border-b lg:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="group whitespace-normal py-4 text-left text-sm font-medium capitalize text-gray-200 sm:px-6 "
                  key={header.id}
                  onClick={() => {
                    header.column.getToggleSortingHandler();
                    onChangeSorting(table.getState().sorting);
                  }}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center gap-2"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: (
                          <ArrowDownIcon className="h-4 w-4 text-gray-600 duration-200 group-hover:text-white" />
                        ),
                        desc: (
                          <ArrowUpIcon className="h-4 w-4 text-gray-600 duration-200 group-hover:text-white" />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
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
              className="bg-transparent transition-all duration-100 hover:bg-indigo-700"
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
                  max={table.getPageCount()}
                  value={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                    onChangePage && onChangePage(page);
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
                  onChangePageSize && onChangePageSize(Number(value));
                }}
              />
            </div>
            <div className="flex space-x-4">
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg transition-all duration-200 hover:bg-indigo-500 hover:text-white"
                onClick={() => {
                  table.previousPage();

                  onChangePage(table.getState().pagination.pageIndex - 1);
                }}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg transition-all duration-200 hover:bg-indigo-500 hover:text-white"
                onClick={() => {
                  table.nextPage();
                  onChangePage(table.getState().pagination.pageIndex + 1);
                }}
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
