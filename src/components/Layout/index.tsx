import React from "react";
import { Outlet } from "react-router-dom";
import { SearchForm } from "components/SearchForm";
import "./layout.css";
export function Layout() {
  return (
    <div>
      <header className="root-layout">
        <SearchForm></SearchForm>
      </header>
      <Outlet />
      <footer>Soy el footer</footer>
    </div>
  );
}
