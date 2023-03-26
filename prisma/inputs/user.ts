import type { User } from "@prisma/client";
import { Role } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const UserInput = schemaForType<User>()(
  z.object({
    id: z.string(),
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    emailVerified: z.date(),
    image: z.string(),
    position: z.string(),
    description: z.string(),
    roles: z.array(
      z.enum([Role.ADMIN, Role.USER, Role.LOGISTICS, Role.VENDOR])
    ),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);

export default UserInput;
