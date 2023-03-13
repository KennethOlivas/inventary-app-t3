import {
  enforceUserIsAdminOrVendor,
  protectedProcedure,
} from "@/server/api/trpc";
import { CustomerInput } from "prisma/inputs";

const schema = CustomerInput.pick({
  id: true,
  name: true,
  email: true,
  lastName: true,
  phone: true,
  address: true,
});

export const editCustomer = protectedProcedure
  .use(enforceUserIsAdminOrVendor)
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { name, address, email, lastName, phone, id } = input;
    return ctx.prisma.customer.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        email,
        lastName,
        phone,
      },
    });
  });
