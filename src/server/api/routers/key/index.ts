import { createTRPCRouter } from "../../trpc";
import { validateKey } from "./queries/validateKey";

export const keyRouter = createTRPCRouter({
  validateKey: validateKey,
});
