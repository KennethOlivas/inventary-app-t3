import { createTRPCRouter } from "../../trpc";
import { addCustomer } from "./mutations/addCustomer";
import { deleteCustomer } from "./mutations/deleteCustomer";
import { editCustomer } from "./mutations/editCustomer";
import { all } from "./queries/all";

export const customerRouter = createTRPCRouter({
  all: all,
  addCustomer: addCustomer,
  editCustomer: editCustomer,
  deleteCustomer: deleteCustomer,
});
