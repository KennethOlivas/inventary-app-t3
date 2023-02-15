import Loader from "@/components/Loader";
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
      <div className="max-w-screen-2xl-lg mx-auto mt-8 p-4 px-2">
        <p>{data.name}</p>
        <p> {data.email}</p>
        <p>{data.id}</p>
      </div>
    </div>
  );
};

export default User;
