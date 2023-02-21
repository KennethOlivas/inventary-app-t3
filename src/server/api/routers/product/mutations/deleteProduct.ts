import { protectedProcedure } from "@/server/api/trpc";
import { ProductInput } from "prisma/inputs";

const schema = ProductInput.pick({
  id: true,
});

export const deleteProduct = protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { id } = input;
    return ctx.prisma.product.delete({
      where: { id: id },
    });
  });
