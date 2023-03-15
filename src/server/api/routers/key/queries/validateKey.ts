import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const schema = z.object({
  key: z.string(),
});

export const validateKey = publicProcedure.input(schema).query(({ input }) => {
  return input.key === process.env.AUTH_KEY;
});
