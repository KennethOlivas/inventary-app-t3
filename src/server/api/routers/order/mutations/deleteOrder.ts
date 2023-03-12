import { enforceUserIsAdmin, protectedProcedure } from "@/server/api/trpc";
import { OrderInput } from "prisma/inputs";

const schema = OrderInput.pick({
  id: true,
});

export const deleteOrder = protectedProcedure
  .use(enforceUserIsAdmin)
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const { id } = input;
    return await ctx.prisma.order.delete({
      where: { id },
    });
  });
