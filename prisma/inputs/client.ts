import type { Client } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const ProductInput = schemaForType<Client>()(
  z.object({
    id: z.string(),
    name: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export default ProductInput;
