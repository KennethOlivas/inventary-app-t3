import Loader from "@/components/Loader";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading, refetch } = api.user.byId.useQuery({ id: id });
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div className="w-screen">
      <Breadcrumbs />
      <div className="max-w-screen-2xl-lg mx-auto  px-2">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-200">
            User: {data.name}
          </h1>
        </div>
        <p>{data.name}</p>
        <p> {data.email}</p>
        <p>{data.id}</p>
      </div>
    </div>
  );
};

export default User;
