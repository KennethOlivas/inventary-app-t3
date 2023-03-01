import { createTRPCRouter } from "../../trpc";

import { all } from "./queries/all";

export const orderRouter = createTRPCRouter({
  all: all,
});
