import TabItem from "@/components/UI/Tabs/TabItem";
import Tabs from "@/components/UI/Tabs/Tabs";
import type { User } from "@prisma/client";
import type { FC } from "react";
import React, { useMemo } from "react";
import DeleteUser from "./DeleteUser";
import EditRoleForm from "./EditRoleForm";
import EditUserForm from "./EditUserForm";

type Props = {
  userData: User | null | undefined;
  refetch?: () => void;
};

const UserTabSettings: FC<Props> = ({ userData, refetch }) => {
  const setingsItems = useMemo(() => {
    return ["General", "Roles", "More"];
  }, []);

  return (
    <Tabs items={setingsItems}>
      <TabItem>
        <EditUserForm userData={userData} refetch={refetch} />
      </TabItem>
      <TabItem>
        <EditRoleForm
          id={userData!.id}
          roleId={userData?.roleId}
          refetch={refetch}
        />
      </TabItem>
      <TabItem>
        <DeleteUser userData={userData} />
      </TabItem>
    </Tabs>
  );
};

export default UserTabSettings;
