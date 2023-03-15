import { createTRPCRouter } from "../../trpc";
import { all } from "./queries/all";
import { byId } from "./queries/byId";
import { addUser } from "./mutations/addUser";
import { editUser } from "./mutations/editUser";
import { xlsx } from "./mutations/xlsx";
import { deleteUser } from "./mutations/deleteUser";
import { byEmail } from "./queries/byEmail";
import { addRole } from "./mutations/addRole";

export const userRouter = createTRPCRouter({
  all: all,
  byId: byId,
  byEmail: byEmail,
  addUser: addUser,
  editUser: editUser,
  deleteUser: deleteUser,
  addRole: addRole,
  xlsx: xlsx,
});
