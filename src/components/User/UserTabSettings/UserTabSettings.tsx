import TabItem from "@/components/UI/Tabs/TabItem";
import Tabs from "@/components/UI/Tabs/Tabs";
import { User } from "@prisma/client";
import React, { FC, useMemo } from "react";
import EditUserForm from "./EditUserForm";

type Props = {
  userData: User | null | undefined;
};

const UserTabSettings: FC<Props> = ({ userData }) => {
  const SelectedTab = (item: string) => {
    console.log(item);
  };
  const setingsItems = useMemo(() => {
    return ["General", "Roles", "Extra"];
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
        <p>data3</p>
      </TabItem>
    </Tabs>
  );
};

export default UserTabSettings;
