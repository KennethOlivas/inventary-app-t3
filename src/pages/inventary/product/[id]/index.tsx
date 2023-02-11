import { useRouter } from "next/router";
import React from "react";

type Props = {};

const index = (props: Props) => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div>
      <p className="text-2xl text-white">Soy el producto numero: {id}</p>
    </div>
  );
};

export default index;
