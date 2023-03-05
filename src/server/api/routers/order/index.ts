import { createTRPCRouter } from "../../trpc";
import { addOrder } from "./mutations/addOrder";

import { all } from "./queries/all";
import { byId } from "./queries/byId";
import { bycountCustomerOrderId } from "./queries/countCustomerOrder";

export const orderRouter = createTRPCRouter({
  all: all,
  byId: byId,
  addOrder: addOrder,
  bycountCustomerOrderId: bycountCustomerOrderId,
});
