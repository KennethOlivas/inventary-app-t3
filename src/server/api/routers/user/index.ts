import { createTRPCRouter } from "../../trpc";
import { all } from "./queries/all";

export const userRouter = createTRPCRouter({
  all: all,
});
