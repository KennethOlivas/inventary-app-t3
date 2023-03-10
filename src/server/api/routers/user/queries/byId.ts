import { publicProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";

const schema = UserInput.pick({ id: true });

export const byId = publicProcedure.input(schema).query(({ ctx, input }) => {
  const { id } = input;
  return ctx.prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Role: true,
    },
  });
});
