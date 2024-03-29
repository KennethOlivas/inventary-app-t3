import { createTRPCRouter } from "../../trpc";
import { addProduct } from "./mutations/addProduct";
import { deleteProduct } from "./mutations/deleteProduct";
import { editProduct } from "./mutations/editProduct";
import { xlsx } from "./mutations/xlsx";
import { all } from "./queries/all";
import { getProductsByName } from "./queries/byName";
import { countTotalProducts } from "./queries/countTotalProducts";
import { getProductById } from "./queries/getProductById";

export const productRouter = createTRPCRouter({
  all: all,
  getProductById: getProductById,
  addProduct: addProduct,
  deleteProduct: deleteProduct,
  editProduct: editProduct,
  getProductsByName: getProductsByName,
  countTotalProducts: countTotalProducts,
  xlsx: xlsx,
});
