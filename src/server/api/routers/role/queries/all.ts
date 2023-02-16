import { protectedProcedure } from "@/server/api/trpc";

export const all = protectedProcedure.query(({ ctx }) => {
  return ctx.prisma.role.findMany();
});
