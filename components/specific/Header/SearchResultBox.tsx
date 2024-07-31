import AppDataNotFound from "@/components/common/AppDataNotFound";
import AppLoading from "@/components/common/AppLoading";
import React, { useEffect } from "react";

interface ISearchResultItem {
  title: string;
  link: string;
}

export interface ISearchResultList {
  title: string;
  children: ISearchResultItem[];
}

const SearchResultItem = ({ title }: ISearchResultItem) => {
  return (
    <span className="rounded-full py-1 px-3 font-light border border-gray-200  whitespace-nowrap text-sm hover:bg-gray-100 cursor-pointer transition-colors">
      {title}
    </span>
  );
};

const SearchResultList = ({
  searchResultList,
}: {
  searchResultList: ISearchResultList;
}) => {
  return (
    <>
      <span className="text-base font-medium">{searchResultList.title}</span>
      <ul className="flex items-center gap-3 flex-wrap mt-2">
        {[...Array(30)].map((item, index) => (
          <li key={index}>
            <SearchResultItem title={`Item ${index + 1}`} link="" />
          </li>
        ))}
      </ul>
    </>
  );
};

export interface ISearchResultBoxProps {
  loading: Boolean;
  data: ISearchResultList[];
}

const SearchResultBox = ({ loading, data }: ISearchResultBoxProps) => {

  function handleClickOutside(event : any){
      
  }

  useEffect(() => {
      document.addEventListener('click', handleClickOutside);
 
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full md:border md:border-gray-100 rounded-b-lg bg-white  md:shadow-sm max-h-96 overflow-y-auto scrollbar-1">
      <AppLoading loading={loading}>
        {
          data.length > 0 ? (
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
          )
        }
        </AppLoading>
    </div>
  );
};

export default SearchResultBox;
