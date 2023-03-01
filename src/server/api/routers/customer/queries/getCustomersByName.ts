import { protectedProcedure } from "@/server/api/trpc";
import { CustomerInput } from "prisma/inputs";

const schema = CustomerInput.pick({
  name: true,
});

export const getCustomersByName = protectedProcedure
  .input(schema)
  .query(({ ctx, input }) => {
    const { name } = input;
    if (name === "") return [];
    // find customers by name or last name
    return ctx.prisma.customer.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: name,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  });
