import React, { useState } from "react";
import ListsComponent from "components/ListsComponent";
import ModalAdd from "components/ModalAdd";
import GetAll from "hooks";

const ListPage = () => {
  const [isLoadingNewData, setIsLoadingNewData] = useState(
    new Date().toString()
  );
  const { data } = GetAll(isLoadingNewData);

  const onNewLoading = () => {
    setIsLoadingNewData(new Date().toString());
  };

  return (
    <>
      <div className="w-[320px] md:w-[600px] lg:w-[750px] bg-gradient-to-l from-cyan-500 to-blue-500 p-4 md:bg-slate-300 md:p-4 rounded-xl shadow-xl">
        <ModalAdd title="Add todo" onNewLoading={onNewLoading} />
        <div className="block justify-start gap-3 md:flex md:justify-between md:flex-wrap">
          <ListsComponent items={data} onNewLoading={onNewLoading} />
        </div>
      </div>
    </>
  );
};

export default ListPage;
