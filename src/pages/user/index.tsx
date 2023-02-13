import Table from "@/components/Table";
import { NextPage } from "next";
import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User, UserData } from "@/common/UserTestData";
import Select from "@/components/Select";

const index: NextPage = () => {
  const cols = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "id",
        cell: (row) => row.renderValue(),
        accessorKey: "id",
      },
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "email",
      },
      {
        header: "Sesions",
        cell: (row) => row.renderValue(),
        accessorKey: "sesions",
      },
    ],
    []
  );
  return (
    <div className="w-screen">
      <div className="max-w-screen-2xl-lg mx-auto mt-8 px-2">
        <div>
        </div>
        <div className="p-4">
          <Table data={UserData} columns={cols} showFooter={false} />
        </div>
      </div>
    </div>
  );
};

export default index;
