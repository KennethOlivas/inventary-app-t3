import type { Shipping } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const ShippingInput = schemaForType<Shipping>()(
  z.object({
    id: z.string(),
    address: z.string(),
    city: z.string(),
    status: z.enum(["REDY_TO_SHIP", "SHIPPED", "DELIVERED"]),
    name: z.string(),
    price: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deliveryAt: z.date(),
    orderId: z.string(),
  })
);

export default ShippingInput;
