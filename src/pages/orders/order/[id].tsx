import Loader from "@/components/Loader";
import ChangeOrderStatusForm from "@/components/Order/ChangeOrderStatusForm";
import OrderSumary from "@/components/Order/OrderSumary";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import HeaderTitle from "@/components/UI/HeaderTitle";
import Modal from "@/components/UI/Modal/Index";
import useModal from "@/hooks/modalState";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const Order = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { isShowing, toggle } = useModal();

  const { data, isLoading, refetch } = api.order.byId.useQuery({
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
          <HeaderTitle title={`Order #${data?.invoiceNumber}`}>
            <button onClick={toggle} className="indigo-button">
              Order Status
            </button>
          </HeaderTitle>
        </div>
        <Modal state={isShowing} title="Order Status" onClose={toggle}>
          <ChangeOrderStatusForm
            onStatusChange={toggle}
            id={data!.id}
            status={data!.status}
            refetch={refetch}
          />
        </Modal>

        <OrderSumary refetch={refetch} order={data!} />
      </div>
    </>
  );
};

export default Order;
