import { createTRPCRouter } from "../../trpc";
import { addOrder } from "./mutations/addOrder";
import { changeStatus } from "./mutations/changeStatus";
import { deleteOrder } from "./mutations/deleteOrder";
import { all } from "./queries/all";
import { byId } from "./queries/byId";
import { bycountCustomerOrderId } from "./queries/countCustomerOrder";
import { countTotalCanceledOrders } from "./queries/countTotalCanceledOrders copy";
import { countTotalOrders } from "./queries/countTotalOrders";

export const orderRouter = createTRPCRouter({
  all: all,
  byId: byId,
  addOrder: addOrder,
  bycountCustomerOrderId: bycountCustomerOrderId,
  changeStatus: changeStatus,
  deleteOrder: deleteOrder,
  countTotalOrders: countTotalOrders,
  countTotalCanceledOrders: countTotalCanceledOrders,
});
