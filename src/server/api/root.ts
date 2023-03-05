import { createTRPCRouter } from "./trpc";
import { userRouter } from "@/server/api/routers/user";
import { roleRouter } from "./routers/role";
import { productRouter } from "./routers/product";
import { customerRouter } from "./routers/customer";
import { orderRouter } from "./routers/order";
import { shippongRouter } from "./routers/shipping";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  role: roleRouter,
  product: productRouter,
  customer: customerRouter,
  order: orderRouter,
  shipping: shippongRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
