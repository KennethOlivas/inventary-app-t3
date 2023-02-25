import { publicProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";

const schema = UserInput.pick({ email: true });

export const byEmail = publicProcedure.input(schema).query(({ ctx, input }) => {
  const { email } = input;
  return ctx.prisma.user.findUnique({
    where: {
      email,
    },
  });
});
