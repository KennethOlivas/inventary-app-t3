import { enforceUserIsAdmin, protectedProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";

const schema = UserInput.pick({ id: true });

export const byId = protectedProcedure
  .use(enforceUserIsAdmin)
  .input(schema)
  .query(({ ctx, input }) => {
    const { id } = input;
    return ctx.prisma.user.findUnique({
      where: {
        id,
      },
    });
  });
