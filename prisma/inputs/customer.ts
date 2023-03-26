import type { Customer } from "@prisma/client";
import { Cities } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const CustomerInput = schemaForType<Customer>()(
  z.object({
    id: z.string(),
    name: z.string({
      required_error: "Name is required",
    }),
    lastName: z.string({
      required_error: "Last name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    phone: z.string({
      required_error: "Phone is required",
    }),
    city: z.nativeEnum(Cities).nullable(),
    address: z.string({
      required_error: "Address is required",
    }),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export default CustomerInput;
