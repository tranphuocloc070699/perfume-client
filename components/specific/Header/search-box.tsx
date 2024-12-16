"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import SearchResultBox, { ISearchResultList } from "./search-result-box";

import _debounce from "lodash/debounce";
import { useClickOutSide } from "@/hooks/useClickOutside";
import { useSearchBoxData } from "@/hooks/fetch-data/header/useSearchBox";
import { useSearchParams, usePathname } from "next/navigation";

const SearchBox = () => {
  const { data, loading, execute } = useSearchBoxData();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [value, setValue] = useState("");
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);

  const [isShowSearchResultBox, setIsShowSearchResultBox] = useState(false);

  const searchResultRef = useClickOutSide(() => {
    closeSearchResultBox();
  });

  function handleDebounceFn(inputValue: string) {
    if (!inputValue || inputValue.trim().length === 0) return;
    execute({ searchInput: inputValue });
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!isShowSearchResultBox) openSearchResultBox();
    setValue(event.target.value);
    debounceFn(event.target.value);
  }

  function openSearchBox() {
    setIsOpenSearchBox(true);
  }

  function closeSearchBox() {
    setIsOpenSearchBox(false);
  }

  function openSearchResultBox() {
    setIsShowSearchResultBox(true);
  }

  function closeSearchResultBox() {
    setIsShowSearchResultBox(false);
  }

  useEffect(() => {
    if (isOpenSearchBox) closeSearchBox();
    if (isShowSearchResultBox) closeSearchResultBox();
    if (value.trim().length > 0) setValue("");
  }, [pathname, searchParams]);

  return (
    <section>
      <Icon
        icon={isOpenSearchBox ? "iconamoon:close-duotone" : `fe:search`}
        className=" md:hidden fixed top-2 md:right-8 right-4 text-4xl transition-all z-30 text-slate-700"
        onClick={isOpenSearchBox ? closeSearchBox : openSearchBox}
      />
      <div
        className={`${
          isOpenSearchBox
            ? "fixed top-0 left-0 right-0 bottom-0 bg-white z-20 py-14 px-4"
            : "md:block hidden"
        }`}
      >
        <div
          className={`border border-gray-200 rounded-3xl  px-4 relative z-50`}
        >
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

          <div
            ref={searchResultRef}
            className={`absolute top-[123%] w-full left-0 right-0 z-50 transition-all  ${
              isShowSearchResultBox && value.trim().length > 0
                ? "block"
                : "hidden"
            }`}
          >
            <SearchResultBox loading={loading} data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBox;
