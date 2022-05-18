import { useRouter } from "next/router";
import React from "react";
import { Header } from "../Header/Header";

const noHeaderRoutes = ["/"];
export const Layout = ({ children }: any) => {
  const routers = useRouter();
  return (
    <div>
      {!noHeaderRoutes.includes(routers?.pathname) && (
        <Header isAuthenticated={true} />
      )}
      <main className="py-5">{children}</main>
    </div>
  );
};
