import { createTRPCRouter } from "../../trpc";
import { byOrder } from "./queries/byOrder";

export const productOrderRouter = createTRPCRouter({
  byOder: byOrder,
});
