import type { NextPage } from "next";
import AuthShowcase from "../components/AuthShowcase";

const dashboard: NextPage = () => {
  return (
    <main className="">
      <p className="text-2xl text-white"></p>
      <AuthShowcase />
    </main>
  );
};

export default dashboard;
