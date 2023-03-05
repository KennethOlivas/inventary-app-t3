import { protectedProcedure } from "@/server/api/trpc";
import productOrderInput from "prisma/inputs/productOrder";

const schema = productOrderInput.pick({
  orderId: true,
});

export const byOrder = protectedProcedure
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
