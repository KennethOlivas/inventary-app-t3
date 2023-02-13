import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import Select from "../Select";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  showFooter: boolean;
  showNavigation?: boolean;
}

export const Table = <T extends object>({
  data,
  columns,
  showFooter = true,
  showNavigation = true,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="mt-6 overflow-hidden rounded-xl bg-[#171717] shadow">
      <table className="min-w-full border-separate border-spacing-y-2 ">
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
            <tr className=" bg-transparent hover:bg-indigo-700" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="whitespace-normal py-4 text-sm font-medium capitalize text-gray-200 sm:px-6"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
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
      </table>
      {showNavigation ? (
        <div className="w-full">
          <div className="mt-5 h-2" />
          <div className="mx-4 flex items-center justify-between gap-2 pb-4">
            <div className="flex space-x-2">
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
            </div>
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
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="w-16 rounded border p-1"
                />
              </span>
              <Select
                label=""
                value={table.getState().pagination.pageSize}
                options={[5, 10, 30, 40, 50]}
                onChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Table;
