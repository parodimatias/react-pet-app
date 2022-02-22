import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./router";
function App() {
  return <AppRoutes></AppRoutes>;
}
ReactDOM.render(<App />, document.getElementById("root"));
