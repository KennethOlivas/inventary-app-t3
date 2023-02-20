import { protectedProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";

const schema = UserInput.pick({ id: true });

export const deleteUser = protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { id } = input;
    const { id: currentUserId } = ctx.session.user;
    if (id === currentUserId) {
      throw new Error("You cannot delete yourself");
    }

    return ctx.prisma.user.delete({
      where: {
        id,
      },
    });
  });
