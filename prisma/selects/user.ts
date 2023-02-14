import { Prisma } from "@prisma/client";

const UserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  name: true,
});

export default UserSelect;
