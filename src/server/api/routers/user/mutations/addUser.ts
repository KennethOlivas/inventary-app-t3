import { publicProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";

const schema = UserInput.pick({ email: true, name: true });

export const addUser = publicProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { email, name } = input;
    return ctx.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  });
