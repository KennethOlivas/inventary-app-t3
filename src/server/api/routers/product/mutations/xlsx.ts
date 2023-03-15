import {
  enfoceUserIsAdminOrLogistics,
  protectedProcedure,
} from "@/server/api/trpc";
import * as ExcelJS from "exceljs";
import { readFileSync } from "fs";
import { z } from "zod";

const schema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

export const xlsx = protectedProcedure
  .use(enfoceUserIsAdminOrLogistics)
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const { startDate, endDate } = input;

    const response = ctx.prisma.product.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const products = await response;

    if (!products) {
      throw new Error("No user found");
    }

    // create workbook & add worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    // add column headers
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 32 },
      { header: "Description", key: "description", width: 64 },
      { header: "Price", key: "price", width: 10 },
      { header: "Stock", key: "stock", width: 10 },
    ];

    // add row
    products.forEach((product) => {
      worksheet.addRow(product);
    });

    // save workbook to disk
    await workbook.xlsx.writeFile("data.xlsx");
    // return file
    const file = readFileSync("data.xlsx");
    return {
      file: file.toString("base64"),
      products: products,
    };
  });
