import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./router";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
export const API_BASE_URL = "http://localhost:3000";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
