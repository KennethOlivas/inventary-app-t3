import type { User } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const UserInput = schemaForType<User>()(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.date(),
    image: z.string(),
  })
);

export default UserInput;
