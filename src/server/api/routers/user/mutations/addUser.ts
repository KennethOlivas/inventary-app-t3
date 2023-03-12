import { enforceUserIsAdmin, protectedProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";

const schema = UserInput.pick({ email: true, name: true });

export const addUser = protectedProcedure
  .input(schema)
  .use(enforceUserIsAdmin)
  .mutation(({ ctx, input }) => {
    const { email, name } = input;
    return ctx.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  });
