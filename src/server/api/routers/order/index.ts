import { createTRPCRouter } from "../../trpc";
import { addOrder } from "./mutations/addOrder";

import { all } from "./queries/all";

export const orderRouter = createTRPCRouter({
  all: all,
  addOrder: addOrder,
});
