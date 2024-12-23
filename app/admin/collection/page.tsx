import React from "react";
import CollectionList from "@/components/specific/Collection/collection-list";

const CollectionPage = () => {
  return (
    <div component-name="CollectionPage" className={"border border-gray-300 rounded-lg p-4 shadow-md"}>
      <h4 className="text-2xl font-semibold text-nowrap border-b border-gray-300 pb-4">Quản lý Collection</h4>
      <div className={"mt-6"}>
        <CollectionList />
      </div>
    </div>
  );
};

export default CollectionPage;