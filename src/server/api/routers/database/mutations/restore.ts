import { enforceUserIsAdmin, protectedProcedure } from "@/server/api/trpc";
import { exec } from "child_process";
import { z } from "zod";

// zod squema that acepts .sql file

const schema = z.object({
  file: z.string().regex(/.sql$/),
});

export const restore = protectedProcedure
  .use(enforceUserIsAdmin)
  .input(schema)
  .mutation(({ input }) => {
    //data base postgress restore file backup.sql

    exec(`psql -U postgres -d postgres -f ${input.file}`, (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  });
