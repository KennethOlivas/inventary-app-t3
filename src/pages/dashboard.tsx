import Cards from "@/components/Dashboard/Cards";
import OdersBarChart from "@/components/Dashboard/OdersBarChart";
import PorductPieChart from "@/components/Dashboard/PorductPieChart";
import type { NextPage } from "next";

const dashboard: NextPage = () => {
  return (
    <div className="w-screen">
      <Cards />
      <div className=" p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 rounded-md bg-neutral-900 lg:col-span-4">
            <PorductPieChart />
          </div>
          <div className="col-span-12 rounded-md bg-neutral-900 lg:col-span-8">
            <OdersBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
