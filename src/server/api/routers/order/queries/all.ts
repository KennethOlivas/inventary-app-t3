import { protectedProcedure } from "@/server/api/trpc";

export const all = protectedProcedure.query(({ ctx }) => {
  return ctx.prisma.order.findMany({
    include: {
      Customer: true,
      Shipping: true,
    },
  });
});
