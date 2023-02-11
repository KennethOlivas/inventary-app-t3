import AuthShowcase from "@/components/AuthShowcase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const login = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  if (sessionData) {
    router.push("/dashboard");
  }
  return (
    <div>
      <AuthShowcase />
    </div>
  );
};

export default login;
