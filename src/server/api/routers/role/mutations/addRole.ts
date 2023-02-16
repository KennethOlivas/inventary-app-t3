import { protectedProcedure } from "@/server/api/trpc";
import { RoleInput } from "prisma/inputs";

const schema = RoleInput.pick({ name: true });

export const addRole = protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { name } = input;
    return ctx.prisma.role.create({
      data: {
        name,
      },
    });
  });
