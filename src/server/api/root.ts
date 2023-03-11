import { createTRPCRouter } from "./trpc";
import { userRouter } from "@/server/api/routers/user";
import { productRouter } from "./routers/product";
import { customerRouter } from "./routers/customer";
import { orderRouter } from "./routers/order";
import { shippongRouter } from "./routers/shipping";
import { productOrderRouter } from "./routers/productOrder";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  product: productRouter,
  customer: customerRouter,
  order: orderRouter,
  shipping: shippongRouter,
  productOrder: productOrderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
