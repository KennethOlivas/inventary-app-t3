import { createTRPCRouter } from "../../trpc";
import { backup } from "./queries/backup";
import { databaseSize } from "./queries/databaseSize";

export const databaseRouter = createTRPCRouter({
  databaseSize: databaseSize,
  backup: backup,
});
