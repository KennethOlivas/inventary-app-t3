import {
  enfoceUserIsAdminOrLogistics,
  protectedProcedure,
} from "@/server/api/trpc";

export const all = protectedProcedure
  .use(enfoceUserIsAdminOrLogistics)
  .query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  });
