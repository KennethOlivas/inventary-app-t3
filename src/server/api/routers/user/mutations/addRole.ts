import { protectedProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";

const schema = UserInput.pick({ id: true, roles: true });

export const addRole = protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { id, roles } = input;
    return ctx.prisma.user.update({
      where: { id },
      data: {
        roles: {
          set: roles,
        },
      },
    });
  });
