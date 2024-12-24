import React from "react";
import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";

type AppDataNotFoundProps = {
  className?: string;
}

const AppDataNotFound = ({ className }) => {
  return (
    <div className={twMerge(`flex flex-col items-center justify-center h-full bg-gray-50 text-gray-800 ${className}`)}>
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-200 rounded-full">
        <Search className="w-8 h-8 text-gray-600" />
      </div>
      <h1 className="text-xl font-semibold">Không có dữ liệu</h1>
      <p className="mt-2 text-sm text-gray-500 text-center px-6">
        Chúng tôi đang cập nhật dữ liệu mới, bạn thử lại sau nhé.
      </p>
    </div>
  );
};

export default AppDataNotFound;
