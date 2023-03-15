import { createTRPCRouter } from "../../trpc";
import { addOrder } from "./mutations/addOrder";
import { changeStatus } from "./mutations/changeStatus";
import { deleteOrder } from "./mutations/deleteOrder";
import { xlsx } from "./mutations/xlsx";
import { all } from "./queries/all";
import { byId } from "./queries/byId";
import { byCountCustomerOrderId } from "./queries/countCustomerOrder";
import { countOrdersBetweenMonths } from "./queries/countOrdersBetweenMonths";
import { countTotalCanceledOrders } from "./queries/countTotalCanceledOrders copy";
import { countTotalOrders } from "./queries/countTotalOrders";

export const orderRouter = createTRPCRouter({
  all: all,
  byId: byId,
  addOrder: addOrder,
  bycountCustomerOrderId: byCountCustomerOrderId,
  changeStatus: changeStatus,
  deleteOrder: deleteOrder,
  countTotalOrders: countTotalOrders,
  countTotalCanceledOrders: countTotalCanceledOrders,
  countOrdersBetweenMonths: countOrdersBetweenMonths,
  xlsx: xlsx,
});
