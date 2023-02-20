import { createTRPCRouter } from "../../trpc";
import { addProduct } from "./mutations/addProduct";
import { all } from "./queries/all";

export const productRouter = createTRPCRouter({
  all: all,
  addProduct: addProduct,
});
