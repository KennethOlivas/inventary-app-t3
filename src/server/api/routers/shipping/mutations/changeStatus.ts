import {
  enforceUserIsAdminOrVendor,
  protectedProcedure,
} from "@/server/api/trpc";
import { ShippingInput } from "prisma/inputs";

const schema = ShippingInput.pick({ id: true, status: true });

export const changeStatus = protectedProcedure
  .use(enforceUserIsAdminOrVendor)
  .input(schema)
  .mutation(({ ctx, input }) => {
    const { id, status } = input;
    return ctx.prisma.shipping.update({
      where: { id },
      data: { status },
    });
  });
