import { enforceUserIsAdmin, publicProcedure } from "@/server/api/trpc";

export const all = publicProcedure.use(enforceUserIsAdmin).query(({ ctx }) => {
  return ctx.prisma.user.findMany();
});
