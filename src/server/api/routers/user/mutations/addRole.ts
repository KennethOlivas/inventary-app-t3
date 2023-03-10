import { protectedProcedure } from "@/server/api/trpc";
import { UserInput, RoleInput } from "prisma/inputs";

const schema = UserInput.pick({ id: true }).extend({
  role: RoleInput.pick({ id: true }),
});

export const addRole = protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { id, role } = input;
    return ctx.prisma.user.update({
      where: { id },
      data: {
        roleId: role.id,
      },
    });
  });
