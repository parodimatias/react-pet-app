import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "pages/Home";
import { Layout } from "components/Layout";
import { Item } from "pages/Item";
import { MyDataPage } from "pages/MyDataPage";

export function AppRoutes() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mydata" element={<MyDataPage />}></Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
}
