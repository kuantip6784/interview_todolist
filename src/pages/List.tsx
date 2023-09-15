import React, { useEffect, useState } from "react";
import ListsComponent from "components/ListsComponent";
import api from "services";
import Cookies from "js-cookie";

const List = () => {
  const [toDolist, setTodoList] = useState([]);
  const getAll = async () => {
    try {
      const res = await api.getAll();
      if (res.status === 200) {
        setTodoList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  const onDelete = async (id: string) => {
    const res = await api.delete(id);
    if (res.status === 200) {
      getAll();
    }
  };

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex flex-wrap justify-start gap-2 gap-y-3">
          <ListsComponent data={toDolist} onDelete={onDelete} />
        </div>
      </div>
    </>
  );
};

export default List;
