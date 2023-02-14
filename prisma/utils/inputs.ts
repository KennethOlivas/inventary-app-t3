import type * as z from 'zod';

// https://github.com/colinhacks/zod/issues/372#issuecomment-826380330
// eslint-disable-next-line import/prefer-default-export
export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T>>(arg: S): S =>
    arg;
