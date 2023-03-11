import { protectedProcedure } from "@/server/api/trpc";
import { UserInput } from "prisma/inputs";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  data: UserInput.pick({
    email: true,
    name: true,
    position: true,
    description: true,
  }).partial(),
});

export const editUser = protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const {
      id,
      data: { description, email, name, position },
    } = input;
    return ctx.prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        description,
        position,
      },
    });
  });
