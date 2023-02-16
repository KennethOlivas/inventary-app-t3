import { createTRPCRouter } from "./trpc";
import { userRouter } from "@/server/api/routers/user";
import { roelRouter } from "./routers/role";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  role: roelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
