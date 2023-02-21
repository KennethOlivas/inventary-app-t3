import { protectedProcedure } from "@/server/api/trpc";
import { ProductInput } from "prisma/inputs";

const schema = ProductInput.pick({
  id: true,
});

export const getProductById = protectedProcedure
  .input(schema)
  .query(({ ctx, input }) => {
    const { id } = input;
    return ctx.prisma.product.findUnique({
      where: { id },
    });
  });
