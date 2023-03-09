import { protectedProcedure } from "@/server/api/trpc";

export const countTotalOrders = protectedProcedure.query(({ ctx }) => {
  return ctx.prisma.order.count();
});
