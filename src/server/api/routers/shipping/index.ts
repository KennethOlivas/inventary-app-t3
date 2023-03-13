import { createTRPCRouter } from "../../trpc";
import { changeStatus } from "./mutations/changeStatus";

export const shippongRouter = createTRPCRouter({
  changeStatus: changeStatus,
});
