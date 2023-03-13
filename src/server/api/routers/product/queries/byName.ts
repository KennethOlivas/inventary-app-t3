import { protectedProcedure } from "@/server/api/trpc";
import { ProductInput } from "prisma/inputs";

const schema = ProductInput.pick({
  name: true,
});

export const getProductsByName = protectedProcedure
  .input(schema)
  .query(({ ctx, input }) => {
    const { name } = input;
    if (name === "") return [];
    return ctx.prisma.product.findMany({
      where: {
        stock: {
          gt: 0,
        },
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  });
