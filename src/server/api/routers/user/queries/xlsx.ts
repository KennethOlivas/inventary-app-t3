import { publicProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";
import * as ExcelJS from "exceljs";
import { readFileSync } from "fs";

export const xlsx = publicProcedure.mutation(async ({ ctx }) => {
  const response = ctx.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const users = await response;

  if (!users) {
    throw new Error("No user found");
  }

  // create workbook & add worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Users");

  // add column headers
  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Name", key: "name", width: 32 },
    { header: "Email", key: "email", width: 32 },
  ];

  // add row
  users.forEach((user) => {
    worksheet.addRow(user);
  });

  // save workbook to disk
  await workbook.xlsx.writeFile("data.xlsx");
  // return file
  const file = readFileSync("data.xlsx");
  return {
    file: file.toString("base64"),
  };
});
