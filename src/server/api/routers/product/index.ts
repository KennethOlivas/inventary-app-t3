import { createTRPCRouter } from "../../trpc";
import { addProduct } from "./mutations/addProduct";
import { deleteProduct } from "./mutations/deleteProduct";
import { editProduct } from "./mutations/editProduct";
import { all } from "./queries/all";
import { getProductById } from "./queries/getProductById";

export const productRouter = createTRPCRouter({
  all: all,
  getProductById: getProductById,
  addProduct: addProduct,
  deleteProduct: deleteProduct,
  editProduct: editProduct,
});
