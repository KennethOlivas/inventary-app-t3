import { protectedProcedure } from "@/server/api/trpc";
import { CustomerInput } from "prisma/inputs";

const schema = CustomerInput.pick({
  name: true,
  email: true,
  lastName: true,
  phone: true,
  address: true,
});

export const addCustomer = protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { name, address, email, lastName, phone } = input;
    return ctx.prisma.customer.create({
      data: {
        name,
        address,
        email,
        lastName,
        phone,
      },
    });
  });
