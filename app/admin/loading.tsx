import React from "react";
import DataLoadingSpinner from "@/components/common/data-loading-spinner";

const Loading = () => {
  console.log("loading...");
  return (
    <div component-name="Loading" className={"w-full h-full flex items-center justify-center"}>
      <DataLoadingSpinner text={"Đang tải dữ liệu..."} />
    </div>
  );
};

export default Loading;