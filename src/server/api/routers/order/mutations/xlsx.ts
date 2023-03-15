import {
  enforceUserIsAdminOrVendor,
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
  .use(enforceUserIsAdminOrVendor)
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const { startDate, endDate } = input;

    const response = ctx.prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        Customer: true,
        ProductOrder: true,
        Shipping: true,
      },
    });

    const orders = await response;

    if (!orders) {
      throw new Error("No user found");
    }

    // create workbook & add worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    // add column headers
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 32 },
      { header: "status", key: "status", width: 10 },
      { header: "invoiceNumber", key: "invoiceNumber", width: 10 },
      { header: "shipping", key: "shipping", width: 10 },
      { header: "subTotal", key: "subTotal", width: 10 },
      { header: "total", key: "total", width: 10 },
      { header: "createdAt", key: "createdAt", width: 10 },
      { header: "iva", key: "iva", width: 10 },
      { header: "customerId", key: "customerId", width: 10 },
    ];

    // add row
    orders.forEach((order) => {
      worksheet.addRow(order);
    });

    // add new worksheet for products
    const worksheetProducts = workbook.addWorksheet("Products");

    // add column headers
    worksheetProducts.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 32 },
      { header: "Description", key: "description", width: 64 },
      { header: "Quantity", key: "quantity", width: 10 },
    ];

    // add row
    orders.forEach((order) => {
      order.ProductOrder.forEach((product) => {
        worksheetProducts.addRow(product);
      });
    });

    // save workbook to disk
    await workbook.xlsx.writeFile("data.xlsx");
    // return file
    const file = readFileSync("data.xlsx");
    return {
      file: file.toString("base64"),
      orders: orders,
    };
  });
