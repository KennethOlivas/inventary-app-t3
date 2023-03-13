import { protectedProcedure } from "@/server/api/trpc";

export const countTotalCustomers = protectedProcedure.query(({ ctx }) => {
  return ctx.prisma.customer.count();
});
