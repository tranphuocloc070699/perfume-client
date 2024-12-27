import React, { useEffect, useMemo, useState } from "react";
import Input from "@/components/ui/input";
import { useSearchBoxData } from "@/hooks/fetch-data/header/useSearchBox";
import SearchResultBox from "@/components/specific/Header/search-result-box";
import { useClickOutSide } from "@/hooks/useClickOutside";
import Icon from "@/components/ui/icon";
import Typography from "@/components/ui/typography";
import { twMerge } from "tailwind-merge";

const HeaderSearching = () => {

  const { data, loading, setLoading, execute } = useSearchBoxData();
  const [isShowSearchResultBox, setIsShowSearchResultBox] = useState(false);
  const [openSearchOnMobile, setOpenSearchOnMobile] = useState(false);


  function toggleSearchOnMobile() {
    setOpenSearchOnMobile(prevState => !prevState);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value || e.target.value.trim().length === 0) {
      closeSearchResultBox();
      return;
    }

    execute({ searchInput: e.target.value });
  }

  function handleSearchInputTyping(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isShowSearchResultBox) openSearchResultBox();
    if (!loading) setLoading(true);
  }

  function openSearchResultBox() {
    setIsShowSearchResultBox(true);
  }

  function closeSearchResultBox() {
    setIsShowSearchResultBox(false);
  }

  const searchResultRef = useClickOutSide(() => {
    closeSearchResultBox();
  });

  const SearchInput = useMemo(() => {
    return (
      <Input icon={{ name: "search", reverse: true, className: "text-gray-500" }} variant={"solid"}
             groupClassName={"md:h-8 h-10 md:min-w-[360px] w-full"} name={"search-input"}
             placeholder={"Nhập tên nước hoa..."} debounce={{ callback: handleSearch }}
             onChange={handleSearchInputTyping} />
    );
  }, []);

  const SearchResult = useMemo(() => {
    return (<SearchResultBox loading={loading} data={data} />);
  }, [loading, data]);


  useEffect(() => {
    if (openSearchOnMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup when the component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [openSearchOnMobile]);

  return (
    <div component-name="HeaderSearching">
      <div className={"relative md:block hidden"}>
        {SearchInput}

        <div
          ref={searchResultRef}
          className={`absolute top-[123%] w-full left-0 right-0 z-50 transition-all   ${
            isShowSearchResultBox
              ? "block"
              : "hidden"
          }`}
        >
          {SearchResult}
        </div>
      </div>
      <div className={"md:hidden block mr-6"}>
        <Icon name={"search"} size={20} onClick={toggleSearchOnMobile} />
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 bg-white z-50 py-14 px-4 transition-all duration-300 ${
            openSearchOnMobile ? "block" : "hidden"
          }`}>
          <div className={"absolute top-4 left-4 right-4 flex items-center justify-between"}>
            <Typography.H3>Tìm kiếm</Typography.H3>
            <Icon name={"xMark"} size={28} onClick={toggleSearchOnMobile}
                  className={"w-10 h-10 p-2 rounded bg-gray-100 cursor-pointer "} />
          </div>
          <div className={"mt-6"}>
            {SearchInput}
            <div className={twMerge(`mt-4 ${isShowSearchResultBox ? "block" : "hidden"}`)}>
              {SearchResult}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearching;