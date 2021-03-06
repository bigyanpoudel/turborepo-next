import { useRouter } from "next/router";
import React from "react";
import { Header } from "ui";
const noHeaderRoutes = ["/login"];
export const Layout = ({ children }: any) => {
  const routers = useRouter();
  return (
    <div>
      {noHeaderRoutes.includes(routers?.pathname) ? (
        <Header isAuthenticated={false} />
      ) : (
        <Header isAuthenticated={true} />
      )}
      <main className="py-5">{children}</main>
    </div>
  );
};
