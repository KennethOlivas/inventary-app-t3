import type { User } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const UserInput = schemaForType<User>()(
  z.object({
    id: z.string(),
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    emailVerified: z.date(),
    image: z.string(),
    position: z.string(),
    description: z.string(),
    roleId: z.string(),
  })
);

export default UserInput;
