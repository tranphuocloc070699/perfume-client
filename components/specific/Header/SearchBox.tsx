"use client";

import React, { useState, useCallback,useEffect } from "react";
import { Icon } from "@iconify/react";
import SearchResultBox, { ISearchResultList } from "./SearchResultBox";

import _debounce from "lodash/debounce";

const searchResultList: ISearchResultList[] = [
  {
    title: "Collections 1",
    children: [],
  },
  {
    title: "Collections 2",
    children: [],
  },
  {
    title: "Collections 3",
    children: [],
  },
];

const SearchBox = () => {
  const [value, setValue] = useState("");
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<ISearchResultList[]>([]);
  const [isShowSearchResultBox, setIsShowSearchResultBox] = useState(false);

  function handleDebounceFn(inputValue: string) {
    setSearchResult(searchResultList);
    setSearchLoading(false);
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!searchLoading) setSearchLoading(true);
    if (!isShowSearchResultBox) setIsShowSearchResultBox(true);
    setValue(event.target.value);
    debounceFn(event.target.value);
  }

  

  function openSearchBox() {
    setIsOpenSearchBox(true);
  }

  function closeSearchBox() {
    setIsOpenSearchBox(false);
  }

  return (
    <section>
      <Icon
        icon={
          isOpenSearchBox ? "iconamoon:close-duotone" : `clarity:search-line`
        }
        className=" md:hidden fixed top-3 md:right-8 right-4 text-3xl transition-all z-30"
        onClick={isOpenSearchBox ? closeSearchBox : openSearchBox}
      />
      <div
        className={`${
          isOpenSearchBox
            ? "fixed top-0 left-0 right-0 bottom-0 bg-white z-20 py-14 px-4"
            : "md:block hidden"
        }`}
      >
        <div className={`border border-gray-200 rounded-3xl  px-4 relative`}>
          <input
            value={value}
            onChange={(e) => handleChange(e)}
            placeholder="Search here..."
            className="w-full border-none outline-none px-6 py-[6px] placeholder:text-slate-700 transition-all  focus:px-0 [&:focus+.icon]:opacity-0 text-slate-700 font-light"
          />
          <Icon
            icon="clarity:search-line"
            width={20}
            height={20}
            className="w-5 h-5 icon absolute left-0 top-[20%] ml-3 transition-all "
            color="#757575"
          />
          {isShowSearchResultBox && (
            <div className="absolute top-[123%] w-full left-0 right-0">
              <SearchResultBox loading={searchLoading} data={searchResult} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchBox;
