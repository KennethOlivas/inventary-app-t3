import type { Order } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const OrderInput = schemaForType<Order>()(
  z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    invoiceNumber: z.string(),
    total: z.number(),
    customerId: z.string(),
    shipping: z.boolean(),
    subTotal: z.number(),
    iva: z.number(),
    status: z.enum(["PENDING", "COMPLETED", "CANCELED"]),
  })
);

export default OrderInput;
