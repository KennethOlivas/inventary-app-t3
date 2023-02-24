import { protectedProcedure } from "@/server/api/trpc";
import { CustomerInput } from "prisma/inputs";

const schema = CustomerInput.pick({
  id: true,
});

export const deleteCustomer = protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { id } = input;
    return ctx.prisma.customer.delete({
      where: {
        id,
      },
    });
  });
