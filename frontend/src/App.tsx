import { ConfigProvider, theme } from "antd";
import "./App.css";
import { StoreProvider } from "./hooks/store";
import Router from "./router";

function T() {
  return (
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,
      }}
    >
      <StoreProvider>
        <Router></Router>
      </StoreProvider>
    </ConfigProvider>
  );
}

export default T;
