import { protectedProcedure } from "@/server/api/trpc";
import { OrderInput } from "prisma/inputs";

const schema = OrderInput.pick({
  customerId: true,
});

export const bycountCustomerOrderId = protectedProcedure
  .input(schema)
  .query(({ ctx, input }) => {
    const { customerId } = input;
    return ctx.prisma.order.count({
      where: {
        customerId,
      },
    });
  });
