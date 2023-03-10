import { createTRPCRouter } from "../../trpc";
import { addRole } from "./mutations/addRole";
import { all } from "./queries/all";
import { byId } from "./queries/byid";

export const roleRouter = createTRPCRouter({
  all: all,
  addRole: addRole,
  byId: byId,
});
