import AppDataNotFound from "@/components/common/app-data-not-found";
import Loading from "@/components/common/loading";
import Link from "next/link";
import React from "react";
import DataLoadingSpinner from "@/components/common/data-loading-spinner";
import { twMerge } from "tailwind-merge";

interface ISearchResultItem {
  title: string;
  link: string;
}

export interface ISearchResultList {
  title: string;
  children: ISearchResultItem[];
}

const SearchResultItem = ({ title, link }: ISearchResultItem) => {
  return (
    <Link
      href={link}
      className="rounded-full py-1 px-3 font-normal border border-gray-200  whitespace-nowrap text-sm transition-colors duration-300 hover:bg-gray-100 cursor-pointer "
    >
      {title}
    </Link>
  );
};

const SearchResultList = ({
                            searchResultList
                          }: {
  searchResultList: ISearchResultList;
}) => {
  return (
    <>
      <span className="text-base font-medium">{searchResultList.title}</span>
      <ul className="flex items-center gap-3 flex-wrap mt-2">
        {searchResultList.children.map((item, index) => (
          <li key={index}>
            <SearchResultItem title={item.title} link={item.link} />
          </li>
        ))}
      </ul>
    </>
  );
};

export interface ISearchResultBoxProps {
  loading: boolean;
  data: ISearchResultList[];
}

const SearchResultBox = ({ loading, data }: ISearchResultBoxProps) => {

  return (
    <div
      className="relative w-full md:border md:border-gray-100 rounded-b-lg bg-white  md:shadow-sm h-96 overflow-y-auto scrollbar-1 transition-all duration-300">

      <div
        className={twMerge(`absolute inset-0 w-full h-full flex items-center justify-center opacity-0 transition-all duration-300 ${loading && "opacity-100"}`)}>
        <DataLoadingSpinner text={"Đang tìm kiếm"} />
      </div>

      {!loading && <div className={"absolute inset-0"}>
        {data[0].children.length > 0 ? (
          data.map((item) => (
            <div
              key={item.title}
              className="md:p-4 py-4 md:border-b md:border-gray-100 last:border-b-none last:pb-4"
            >
              <SearchResultList searchResultList={item} />
            </div>
          ))
        ) : (
          <div className={"absolute inset-0 bg-gray-50 flex items-center justify-center"}>
            <AppDataNotFound />
          </div>
        )}
      </div>}
    </div>
  );
};

export default SearchResultBox;


/*
*
*  <Loading loading={loading}>
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.title}
              className="md:p-4 py-4 md:border-b md:border-gray-100 last:border-b-none last:pb-4"
            >
              <SearchResultList searchResultList={item} />
            </div>
          ))
        ) : (
          <div>
            <AppDataNotFound />
          </div>
        )}
      </Loading>
* */
