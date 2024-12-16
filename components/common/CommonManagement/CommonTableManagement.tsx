import React, { useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ITableHeader } from "@/types/admin/admin.interface";
import NextImg from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PopConfirm from "@/components/common/pop-confirm";
import { Input } from "@/components/ui/input";
import _debounce from "lodash/debounce";
import DataLoadingSpinner from "@/components/common/data-loading-spinner";

export interface ICommonTableManagementProps {
  title: string,
  desc: string,
  headers: ITableHeader[],
  data: Array<any>,
  onBtnCreatedClick: () => void,
  onBtnDeleteClick: (id?: string) => void,
  onSearching: (input: string) => void,
  updatePath: string,
  loading: boolean
}

const CommonTableManagement = (props: ICommonTableManagementProps) => {

  const [input, setInput] = useState("");

  function handleDebounceFn(inputValue: string) {
    props.onSearching(inputValue);
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    debounceFn(event.target.value);
  }

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
        <div className={"flex item-center gap-4"}>
          <h4 className="text-2xl font-semibold text-nowrap">{props.title}</h4>
          <Input placeholder={"Searching..."} value={input}
                 onChange={(e) => handleChange(e)} />
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={props.onBtnCreatedClick}
        >
          <Icon icon={"lucide:plus"} className="w-6 h-6" />
          Thêm mới
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
          {props.loading && <TableRow>
            <TableCell colSpan={props.headers.length + 1}>
              <DataLoadingSpinner text={"Load data"} loading={props.loading} />
            </TableCell>
          </TableRow>}

          {!props.loading && props.data.map((data, index) => (
            <TableRow key={data?.id}>
              {Object.keys(data).map((key, index) => (
                <TableCell key={key + index}>
                  {renderUiFromType(props.headers[index], data[key])}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex gap-4 items-center">
                  <Link href={`${props.updatePath}?id=${data?.id}`}>
                    <Icon
                      icon={"fluent-mdl2:edit"}
                      className="w-8 h-8 p-2 bg-gray-200 rounded cursor-pointer"
                    />
                  </Link>
                  <PopConfirm onConfirm={() => props.onBtnDeleteClick(data?.id)}>
                    <Icon
                      icon={"iconoir:trash"}
                      className="w-8 h-8 p-2 bg-gray-200 rounded cursor-pointer"
                    />
                  </PopConfirm>
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
