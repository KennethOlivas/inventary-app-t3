import type * as z from "zod";

export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T>>(arg: S): S =>
    arg;
