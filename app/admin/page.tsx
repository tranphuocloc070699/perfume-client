"use client";

import CommonTableManagement, {
  ICommonTableManagementProps
} from "@/components/common/CommonManagement/CommonTableManagement";
import React from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const productTableData: ICommonTableManagementProps = {
    title: "Quản lý sản phẩm",
    desc: "Danh sách sản phẩm",
    headers: [
      { name: "ID", type: "text" },
      { name: "Thumbnail", type: "image", className: "w-16 h-16" },
      { name: "Tên sản phẩm", type: "text", className: "font-semibold" }
    ],
    data: [
      {
        id: "1",
        thumbnail:
          "https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/zefiro-100ml-1.png?v=1692030237167",
        productName: "Versace Pour Homme"
      },
      {
        id: "2",
        thumbnail:
          "https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/zefiro-100ml-1.png?v=1692030237167",
        productName: "Versace Pour Homme 2"
      }
    ],
    onBtnCreatedClick: () => {
      router.push("/admin/nuoc-hoa");
    }
  };

  const notesTableData: ICommonTableManagementProps = {
    title: "Quản lý nốt hương",
    desc: "Danh sách nốt hương",
    headers: [
      { name: "ID", type: "text" },
      { name: "Thumbnail", type: "image", className: "w-16 h-16" },
      { name: "Tên mùi hương", type: "text", className: "font-semibold" }
    ],
    data: [
      {
        id: "1",
        thumbnail:
          "https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/zefiro-100ml-1.png?v=1692030237167",
        productName: "Bergamot (Cam Bergamot)"
      },
      {
        id: "2",
        thumbnail:
          "https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/zefiro-100ml-1.png?v=1692030237167",
        productName: "Versace Pour Homme 2"
      }
    ],
    onBtnCreatedClick: () => {
      router.push("/nuoc-hoa/up-save");
    }
  };

  return (
    <div>

      <CommonTableManagement {...productTableData} />
    </div>
  );
};

export default AdminDashboard;
