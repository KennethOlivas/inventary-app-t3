import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

export const Table = <T extends object>({
  data,
  columns,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 overflow-hidden rounded-xl  bg-[#171717] shadow">
      <table className="min-w-full border-separate border-spacing-y-2 ">
        <thead className="hidden border-b lg:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="whitespace-normal py-4 text-sm font-medium capitalize text-gray-200 sm:px-6"
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
      </table>
    </div>
  );
};
export default Table;
