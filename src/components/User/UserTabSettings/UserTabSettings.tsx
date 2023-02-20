import TabItem from "@/components/UI/Tabs/TabItem";
import Tabs from "@/components/UI/Tabs/Tabs";
import { User } from "@prisma/client";
import React, { FC, useMemo } from "react";
import DeleteUser from "./DeleteUser";
import EditUserForm from "./EditUserForm";

type Props = {
  userData: User | null | undefined;
};

const UserTabSettings: FC<Props> = ({ userData }) => {
  const setingsItems = useMemo(() => {
    return ["General", "Roles", "More"];
  }, []);

  return (
    <Tabs items={setingsItems}>
      <TabItem>
        <EditUserForm userData={userData} />
      </TabItem>
      <TabItem>
        <p>data2</p>
      </TabItem>
      <TabItem>
        <DeleteUser userData={userData} />
      </TabItem>
    </Tabs>
  );
};

export default UserTabSettings;
