import { createTRPCRouter } from "../../trpc";
import { byOrder } from "./queries/byOrder";
import { mostSellerProducts } from "./queries/mostSellerProducts";

export const productOrderRouter = createTRPCRouter({
  byOder: byOrder,
  mostSellerProducts: mostSellerProducts,
});
