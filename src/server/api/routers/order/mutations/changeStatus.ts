import { protectedProcedure } from "@/server/api/trpc";
import { OrderInput } from "prisma/inputs";

const schema = OrderInput.pick({
  id: true,
  status: true,
});

export const changeStatus = protectedProcedure
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const { id, status } = input;
    const order = await ctx.prisma.order.update({
      where: { id },
      data: { status },
    });
    return order;
  });
