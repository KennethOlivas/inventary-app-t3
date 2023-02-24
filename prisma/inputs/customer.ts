import type { Customer } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const ProductInput = schemaForType<Customer>()(
  z.object({
    id: z.string(),
    name: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export default ProductInput;
