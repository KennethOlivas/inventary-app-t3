import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div>
      <p className="text-2xl text-white">Soy el producto numero: {id}</p>
    </div>
  );
};

export default index;
