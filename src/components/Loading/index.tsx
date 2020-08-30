import * as React from "react";
import { Spin } from "antd";

export default (params) => (
  <div className="loading-spinner">
    <Spin size={params?.size ?? "large"} tip="Loading..." />
  </div>
);
