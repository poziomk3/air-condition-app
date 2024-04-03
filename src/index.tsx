import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CityContext from "./context/CityContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CityContext>
      <App />
    </CityContext>
  </React.StrictMode>
);
