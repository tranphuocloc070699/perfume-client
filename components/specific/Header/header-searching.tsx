import React, { useState } from "react";
import Input from "@/components/ui/input";
import { useSearchBoxData } from "@/hooks/fetch-data/header/useSearchBox";
import SearchResultBox from "@/components/specific/Header/search-result-box";
import { useClickOutSide } from "@/hooks/useClickOutside";

const HeaderSearching = () => {

  const { data, loading, setLoading, execute } = useSearchBoxData();
  const [isShowSearchResultBox, setIsShowSearchResultBox] = useState(false);

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

  return (
    <div component-name="HeaderSearching">
      <div className={"relative"}>
        <Input icon={{ name: "search", reverse: true, className: "text-gray-500" }} variant={"solid"}
               groupClassName={"h-8 md:min-w-[320px]"} name={"search-input"}
               placeholder={"Tìm nước hoa..."} debounce={{ callback: handleSearch }}
               onChange={handleSearchInputTyping} />

        <div
          ref={searchResultRef}
          className={`absolute top-[123%] w-full left-0 right-0 z-50 transition-all   ${
            isShowSearchResultBox
              ? "block"
              : "hidden"
          }`}
        >
          <SearchResultBox loading={loading} data={data} />
        </div>
      </div>
    </div>
  );
};

export default HeaderSearching;