import type { ProductOrder } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const productOrderInput = schemaForType<ProductOrder>()(
  z.object({
    id: z.string(),
    quantity: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    orderId: z.string().nullable(),
    productId: z.string().nullable(),
  })
);

export default productOrderInput;
