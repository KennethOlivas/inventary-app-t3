import {
  enforceUserIsAdminOrVendor,
  protectedProcedure,
} from "@/server/api/trpc";
import { CustomerInput } from "prisma/inputs";

const schema = CustomerInput.pick({
  name: true,
  email: true,
  lastName: true,
  phone: true,
  address: true,
  city: true,
});

export const addCustomer = protectedProcedure
  .use(enforceUserIsAdminOrVendor)
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { name, address, email, lastName, phone, city } = input;
    return ctx.prisma.customer.create({
      data: {
        name,
        address,
        email,
        lastName,
        phone,
        city,
      },
    });
  });
