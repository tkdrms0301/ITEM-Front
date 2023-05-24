import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StyledChart from "./theme/styles";
import ThemeProvider from "./theme/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <BrowserRouter>
      <StyledChart />
      <App />
    </BrowserRouter>
  </ThemeProvider>
  //1
);
