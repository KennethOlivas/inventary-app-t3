import { protectedProcedure } from "@/server/api/trpc";

export const countTotalProducts = protectedProcedure.query(({ ctx }) => {
  return ctx.prisma.product.count();
});
