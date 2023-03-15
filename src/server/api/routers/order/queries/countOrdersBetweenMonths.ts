import { protectedProcedure } from "@/server/api/trpc";

export const countOrdersBetweenMonths = protectedProcedure.query(
  async ({ ctx }) => {
    const thisMonth = new Date().getMonth();
    const lastMonth = thisMonth - 1;
    const orderThisMonth = await ctx.prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), thisMonth, 1),
          lte: new Date(new Date().getFullYear(), thisMonth + 1, 0),
        },
      },
    });

    const orderLastMonth = await ctx.prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), lastMonth, 1),
          lte: new Date(new Date().getFullYear(), lastMonth + 1, 0),
        },
      },
    });

    return {
      orderThisMonth,
      orderLastMonth,
    };
  }
);
