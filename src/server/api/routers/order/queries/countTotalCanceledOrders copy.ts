import { protectedProcedure } from "@/server/api/trpc";

export const countTotalCanceledOrders = protectedProcedure.query(({ ctx }) => {
  return ctx.prisma.order.count({
    where: {
      status: "CANCELED",
    },
  });
});
