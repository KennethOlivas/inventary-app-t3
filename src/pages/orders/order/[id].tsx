import Loader from "@/components/Loader";
import OrderSumary from "@/components/Order/OrderSumary";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

const Order = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, isLoading } = api.order.byId.useQuery({
    id,
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="w-screen">
        <Breadcrumbs />
        <div className="max-w-screen-2xl-lg mx-auto  px-2">
          <HeaderTitle title={`Order #${data?.invoiceNumber}`} />
        </div>

        <OrderSumary order={data!} />
      </div>
    </>
  );
};

export default Order;
