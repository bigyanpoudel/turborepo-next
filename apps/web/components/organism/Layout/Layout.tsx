import React from "react";
import { Header } from "ui";
export const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <main className="py-5">{children}</main>
    </div>
  );
};
