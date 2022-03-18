import { HeaderComp as Header } from "components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div>
      <Header></Header>
      <Outlet />
    </div>
  );
}
