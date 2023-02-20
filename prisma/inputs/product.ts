import type { Product } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const ProductInput = schemaForType<Product>()(
  z.object({
    id: z.string(),
    name: z.string({ required_error: "Name is required" }),
    description: z.string().nullable(),
    price: z.number({ required_error: "Price is required" }).min(1),
    image: z.string().nullable(),
    stock: z.number({ required_error: "Stock is required" }).min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
    orderId: z.string().nullable(),
  })
);

export default ProductInput;
