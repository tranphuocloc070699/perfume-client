import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITableHeader } from "@/types/admin/admin.interface";
import NextImg from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
export interface ICommonTableManagementProps {
  title: string;
  desc: string;
  headers: ITableHeader[];
  data: Array<any>;
}
const CommonTableManagement = (props: ICommonTableManagementProps) => {
  const renderUiFromType = useCallback(
    (header: ITableHeader, data: any) => {
      if (header.type === "image") {
        return (
          <NextImg
            alt="Image"
            width={100}
            height={100}
            className={header.className}
            src={data}
          />
        );
      }
      return <p className={header.className}>{data}</p>;
    },
    [props]
  );

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-semibold">{props.title}</h4>
        <Button className="flex items-center gap-2">
          <Icon icon={"lucide:plus"} className="w-6 h-6" />
          Tạo sản phẩm
        </Button>
      </div>
      <Table>
        <TableCaption>{props.desc}</TableCaption>
        <TableHeader>
          <TableRow>
            {props.headers.map((header) => (
              <TableHead key={header.name}>{header.name}</TableHead>
            ))}
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((data, index) => (
            <TableRow key={data?.id}>
              {Object.keys(data).map((key, index) => (
                <TableCell key={key + index}>
                  {renderUiFromType(props.headers[index], data[key])}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Icon
                    icon={"fluent-mdl2:edit"}
                    className="w-8 h-8 p-2 bg-gray-200 rounded cursor-pointer"
                  />{" "}
                  <Icon
                    icon={"iconoir:trash"}
                    className="w-8 h-8 p-2 bg-gray-200 rounded cursor-pointer"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommonTableManagement;
