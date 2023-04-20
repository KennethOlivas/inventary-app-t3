import { createTRPCRouter } from "../../trpc";
import { restore } from "./mutations/restore";
import { backup } from "./queries/backup";
import { databaseSize } from "./queries/databaseSize";

export const databaseRouter = createTRPCRouter({
  databaseSize: databaseSize,
  backup: backup,
  restore: restore,
});
