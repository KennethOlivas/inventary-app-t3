import { publicProcedure } from "@/server/api/trpc";
import { RoleInput } from "prisma/inputs";

const schema = RoleInput.pick({ id: true });

export const byId = publicProcedure.input(schema).query(({ ctx, input }) => {
  const { id } = input;
  return ctx.prisma.role.findUnique({
    where: { id },
  });
});
