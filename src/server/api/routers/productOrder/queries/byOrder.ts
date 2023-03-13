import {
  enforceUserIsAdminOrVendor,
  protectedProcedure,
} from "@/server/api/trpc";
import productOrderInput from "prisma/inputs/productOrder";

const schema = productOrderInput.pick({
  orderId: true,
});

export const byOrder = protectedProcedure
  .use(enforceUserIsAdminOrVendor)
  .input(schema)
  .query(({ ctx, input }) => {
    const { orderId } = input;
    return ctx.prisma.productOrder.findMany({
      where: { orderId },
      include: {
        Product: true,
      },
    });
  });
