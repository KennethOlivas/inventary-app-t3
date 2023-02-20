import type { Order } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const ProductInput = schemaForType<Order>()(
  z.object({
    id: z.string(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    total: z.number(),
    clientId: z.string(),
  })
);

export default ProductInput;
