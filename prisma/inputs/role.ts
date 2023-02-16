import type { Role } from "@prisma/client";
import * as z from "zod";

import { schemaForType } from "@/utils/schemaForType";

const RoleInput = schemaForType<Role>()(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export default RoleInput;
