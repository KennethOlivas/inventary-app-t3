import { createTRPCRouter } from "../../trpc";
import { addRole } from "./mutations/addRole";
import { all } from "./queries/all";

export const roleRouter = createTRPCRouter({
  all: all,
  addRole: addRole,
});
