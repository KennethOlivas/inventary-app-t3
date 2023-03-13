import {
  enforceUserIsAdminOrVendor,
  protectedProcedure,
} from "@/server/api/trpc";

export const all = protectedProcedure
  .use(enforceUserIsAdminOrVendor)
  .query(({ ctx }) => {
    return ctx.prisma.order.findMany({
      include: {
        Customer: true,
        Shipping: true,
      },
    });
  });
