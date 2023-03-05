import { protectedProcedure } from "@/server/api/trpc";
import { OrderInput } from "prisma/inputs";

const schema = OrderInput.pick({
  id: true,
});

export const byId = protectedProcedure.input(schema).query(({ ctx, input }) => {
  const { id } = input;
  return ctx.prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      Customer: true,
      Shipping: true,
      products: true,
    },
  });
});
