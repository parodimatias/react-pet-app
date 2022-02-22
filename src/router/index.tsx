import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "pages/Home";
import { Layout } from "components/Layout";
import { SearchResults } from "pages/SearchResults/index";
import { Item } from "pages/Item";
import { RecoilRoot } from "recoil";
export function AppRoutes() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="search/:query"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <SearchResults />
                </React.Suspense>
              }
            />
            <Route
              path="item/:id"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Item />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
