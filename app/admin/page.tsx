import CommonTableManagement, {
  ICommonTableManagementProps,
} from "@/components/common/CommonManagement/CommonTableManagement";
import React from "react";

const AdminDashboard = () => {
  const productTableData: ICommonTableManagementProps = {
    title: "Quản lý sản phẩm",
    desc: "Danh sách sản phẩm",
    headers: [
      { name: "ID", type: "text" },
      { name: "Thumbnail", type: "image", className: "w-16 h-16" },
      { name: "Tên sản phẩm", type: "text", className: "font-semibold" },
    ],
    data: [
      {
        id: "1",
        thumbnail:
          "https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/zefiro-100ml-1.png?v=1692030237167",
        productName: "Versace Pour Homme",
      },
      {
        id: "2",
        thumbnail:
          "https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/zefiro-100ml-1.png?v=1692030237167",
        productName: "Versace Pour Homme 2",
      },
    ],
  };

  const notesTableData: ICommonTableManagementProps = {
    title: "Quản lý nốt hương",
    desc: "Danh sách nốt hương",
    headers: [
      { name: "ID", type: "text" },
      { name: "Thumbnail", type: "image", className: "w-16 h-16" },
      { name: "Tên mùi hương", type: "text", className: "font-semibold" },
    ],
    data: [
      {
        id: "1",
        thumbnail:
          "https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/zefiro-100ml-1.png?v=1692030237167",
        productName: "Bergamot (Cam Bergamot)",
      },
      {
        id: "2",
        thumbnail:
          "https://bizweb.dktcdn.net/thumb/medium/100/358/756/products/zefiro-100ml-1.png?v=1692030237167",
        productName: "Versace Pour Homme 2",
      },
    ],
  };

  return (
    <div>
      <CommonTableManagement {...productTableData} />
    </div>
  );
};

export default AdminDashboard;
