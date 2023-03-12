import {
  enforceUserIsAdminOrVendor,
  protectedProcedure,
} from "@/server/api/trpc";

export const all = protectedProcedure
  .use(enforceUserIsAdminOrVendor)
  .query(({ ctx }) => {
    return ctx.prisma.customer.findMany();
  });
