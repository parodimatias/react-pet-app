import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./router";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
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
