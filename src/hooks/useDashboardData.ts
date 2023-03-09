import { api } from "@/utils/api";

const useDashboardData = () => {
  const { data: totalCustomers, isLoading: isLoadingTotalCustomers } =
    api.customer.countTotalCustomers.useQuery();
  const { data: totalOrders, isLoading: isLoadingTotalOrders } =
    api.order.countTotalOrders.useQuery();
  const { data: totalCanceledOrders, isLoading: isLoadingTotalCanceledOrders } =
    api.order.countTotalCanceledOrders.useQuery();
  const { data: totalProducts, isLoading: isLoadingTotalProducts } =
    api.product.countTotalProducts.useQuery();

  const isLoading =
    isLoadingTotalCustomers ||
    isLoadingTotalOrders ||
    isLoadingTotalCanceledOrders ||
    isLoadingTotalProducts;

  return {
    totalCustomers,
    totalOrders,
    totalCanceledOrders,
    totalProducts,
    isLoading,
  };
};

export default useDashboardData;
