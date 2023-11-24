import { notification } from "antd";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

const container = document.getElementById("root");

const root = createRoot(container!);
notification.config({
  placement: "bottomRight",
  bottom: 50,
  duration: 3,
  rtl: true,
});
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
