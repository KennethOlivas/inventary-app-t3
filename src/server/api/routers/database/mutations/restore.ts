import { enforceUserIsAdmin, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

// zod squema that acepts .sql file
const schema = z.object({
  sql: z.string(),
});

export const restore = protectedProcedure
  .use(enforceUserIsAdmin)
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { sql } = input;
    return ctx.prisma.$executeRawUnsafe(sql);
  });
