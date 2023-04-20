import { enforceUserIsAdmin, protectedProcedure } from "@/server/api/trpc";
import { exec } from "child_process";
import { z } from "zod";

// zod squema that acepts .sql file

export const restore = protectedProcedure
  .use(enforceUserIsAdmin)
  .mutation(({ ctx, input }) => {
    // postgresql command to restore database
    exec(
  });
