import {
  enfoceUserIsAdminOrLogistics,
  protectedProcedure,
} from "@/server/api/trpc";
import { ProductInput } from "prisma/inputs";

const schema = ProductInput.pick({
  name: true,
  description: true,
  price: true,
  stock: true,
});

export const addProduct = protectedProcedure
  .use(enfoceUserIsAdminOrLogistics)
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { name, description, price, stock } = input;
    return ctx.prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
      },
    });
  });
