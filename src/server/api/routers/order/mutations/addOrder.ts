import { protectedProcedure } from "@/server/api/trpc";
import { OrderInput, ProductInput, ShippingInput } from "prisma/inputs";
import { z } from "zod";

const schema = OrderInput.extend({
  products: ProductInput.pick({ id: true })
    .extend({
      quantity: z.number(),
    })
    .array(),
  shippingOrder: ShippingInput.pick({
    name: true,
    address: true,
    city: true,
    status: true,
    price: true,
  }),
}).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export const addOrder = protectedProcedure
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const {
      customerId,
      iva,
      shipping,
      status,
      subTotal,
      total,
      products,
      invoiceNumber,
      shippingOrder: { address, city, name, price, status: shippingStatus },
    } = input;

    const totalOrder = shipping ? total + price : total;
    const order = ctx.prisma.order.create({
      data: {
        invoiceNumber,
        customerId,
        iva,
        shipping,
        status,
        subTotal,
        total: totalOrder,
        products: {
          connect: products.map((product) => ({ id: product.id })),
        },
      },
    });

    if (await order) {
      // update quantity of products
      products.forEach(async (product) => {
        const { id, quantity } = product;
        const productToUpdate = await ctx.prisma.product.findUnique({
          where: { id },
        });
        if (productToUpdate) {
          await ctx.prisma.product.update({
            where: { id },
            data: {
              stock: productToUpdate.stock - quantity,
            },
          });
        }
      });

      if (shipping) {
        await ctx.prisma.shipping.create({
          data: {
            address,
            city,
            name,
            price,
            status: shippingStatus,
            orderId: (await order).id,
            // deliveryAt: 3 days after
            deliveryAt: new Date(
              new Date().getTime() + 3 * 24 * 60 * 60 * 1000
            ),
          },
        });
      }
    }
  });
