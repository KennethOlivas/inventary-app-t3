import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import type { FC } from "react";

type Props = {
  error: {
    message?: string;
    code: TRPC_ERROR_CODE_KEY;
    cause?: unknown;
  };
};

const Error: FC<Props> = ({ error }) => {
  return (
    <div>
      <h1>{error?.code}</h1>
      <p>{error?.message}</p>
    </div>
  );
};

export default Error;
