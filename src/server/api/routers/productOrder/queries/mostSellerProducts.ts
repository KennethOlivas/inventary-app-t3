import { protectedProcedure } from "@/server/api/trpc";
import type { Product } from "@prisma/client";

interface MostSellerProducts extends Product {
  quantity: number;
}

export const mostSellerProducts = protectedProcedure.query(async ({ ctx }) => {
  // get most seller products
  const products = await ctx.prisma.product.findMany();
  const productOrder = await ctx.prisma.productOrder.findMany();

  // find the top 5 most seller products by quantity in productOrder
  const mostSellerProductsArray: MostSellerProducts[] = [];
  for (let i = 0; i < 5; i++) {
    let max = 0;
    let maxIndex = 0;
    for (let j = 0; j < products.length; j++) {
      let quantity = 0;
      for (let k = 0; k < productOrder.length; k++) {
        if (products)
          if (products[j]!.id === productOrder[k]!.productId) {
            quantity += productOrder[k]!.quantity;
          }
      }
      if (quantity > max) {
        max = quantity;
        maxIndex = j;
      }
    }
    // add how many times the product was sold

    mostSellerProductsArray.push({
      ...products[maxIndex]!,
      quantity: max,
    });

    products.splice(maxIndex, 1);
  }

  return mostSellerProductsArray;
});
