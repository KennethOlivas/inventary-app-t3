import Loader from "@/components/Loader";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import UserTabSettings from "@/components/User/UserTabSettings/UserTabSettings";
import HeaderTitle from "@/components/UI/HeaderTitle";

const User = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading } = api.user.byId.useQuery({ id: id });
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div className="w-screen">
      <Breadcrumbs />
      <div className="max-w-screen-2xl-lg mx-auto px-2">
        <HeaderTitle title={` User: ${data.name}`} />
        <div className="mt-6 grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="rounded-lg bg-[#171717] p-4 shadow sm:p-6 xl:p-8 ">
            <div className="mb-4 flex w-full items-center justify-center">
              <div>
                <Image
                  className="mx-auto h-32 w-32 rounded-full "
                  src={data.image || "/images/placeholder-image.png"}
                  alt=""
                  width={256}
                  height={256}
                />
                <div className="mt-4 text-center text-5xl font-medium">
                  {data.name}
                </div>
                <div className="mt-4 text-center text-lg font-light">
                  {data.email}
                </div>
                <hr className="mt-2" />
                <div className="mt-2 text-center text-lg font-normal">
                  Position: Dev
                </div>
                <div className="mt-2 text-center text-lg font-normal">
                  Role: Dev
                </div>
                <div className="mt-2 px-6 text-center text-sm font-light">
                  <p>Description</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-[#171717] p-4 shadow sm:p-6 xl:p-8 2xl:col-span-2">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">Settings</h1>
              </div>
            </div>
            <div>
              <UserTabSettings userData={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
