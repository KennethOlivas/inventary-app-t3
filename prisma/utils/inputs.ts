import type z from "zod";

// https://github.com/colinhacks/zod/issues/372#issuecomment-826380330

export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T>>(arg: S): S =>
    arg;
