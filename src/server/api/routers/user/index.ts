import { createTRPCRouter } from "../../trpc";
import { all } from "./queries/all";
import { byId } from "./queries/byId";
import { addUser } from "./mutations/addUser";
import { editUser } from "./mutations/editUser";
import { xlsx } from "./queries/xlsx";

export const userRouter = createTRPCRouter({
  all: all,
  byId: byId,
  addUser: addUser,
  editUser: editUser,
  xlsx: xlsx,
});
