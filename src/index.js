import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { renderRouter } from "./router";

ReactDOM.render(
  <React.StrictMode>{renderRouter()}</React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
