import type { User } from '@prisma/client';
import * as z from 'zod';

import { schemaForType } from '@/utils/inputs';

const UserInput = schemaForType<User>()(
  z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string(),
    lastWorkspace: z.string(),
    nickName: z.string().nullable(),
    gitHubUserName: z.string().nullable(),
    gitHubURL: z.string().url().nullable(),
    deletedAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    createdById: z.string().uuid(),
    updatedById: z.string().uuid(),
  })
);

export default UserInput;
