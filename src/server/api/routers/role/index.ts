import { createTRPCRouter } from "../../trpc";
import { addRole } from "./mutations/addRole";
import { all } from "./queries/all";

export const roelRouter = createTRPCRouter({
  all: all,
  addRole: addRole,
});
