import { createTRPCRouter } from "../../trpc";
import { addOrder } from "./mutations/addOrder";
import { changeStatus } from "./mutations/changeStatus";
import { deleteOrder } from "./mutations/deleteOrder";
import { all } from "./queries/all";
import { byId } from "./queries/byId";
import { bycountCustomerOrderId } from "./queries/countCustomerOrder";

export const orderRouter = createTRPCRouter({
  all: all,
  byId: byId,
  addOrder: addOrder,
  bycountCustomerOrderId: bycountCustomerOrderId,
  changeStatus: changeStatus,
  deleteOrder: deleteOrder,
});
