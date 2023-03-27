import { enforceUserIsAdmin, publicProcedure } from "@/server/api/trpc";

export const databaseSize = publicProcedure
  .use(enforceUserIsAdmin)
  .query(({ ctx }) => {
    const data = ctx.prisma.$queryRawUnsafe(
      `SELECT pg_database_size(current_database()) / 1024 / 1024 || 'MB' AS size_in_mb;`
    );
    return data;
  });
