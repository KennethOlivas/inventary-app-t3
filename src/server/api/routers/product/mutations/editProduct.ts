import {
  enfoceUserIsAdminOrLogistics,
  protectedProcedure,
} from "@/server/api/trpc";
import { ProductInput } from "prisma/inputs";

const schema = ProductInput.pick({
  id: true,
  name: true,
  description: true,
  price: true,
  stock: true,
});

export const editProduct = protectedProcedure
  .use(enfoceUserIsAdminOrLogistics)
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { id, name, description, price, stock } = input;
    return ctx.prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
      },
    });
  });
