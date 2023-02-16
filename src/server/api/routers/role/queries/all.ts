import { publicProcedure } from "@/server/api/trpc";

export const all = publicProcedure.query(({ ctx }) => {
  return ctx.prisma.role.findMany();
});
