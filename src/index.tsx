import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppRoutes } from "./router";
export const API_BASE_URL = "http://localhost:3000";
// export const API_BASE_URL = "https://matias-pet-finder-app.herokuapp.com";

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
