import React, { useEffect, useState } from "react";
import ListsComponent from "components/ListsComponent";
import api from "services";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [toDolist, setTodoList] = useState([]);
  const navigate = useNavigate();
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
        <button
          className=" px-3 py-2 rounded-lg bg-blue-600 text-white mb-2"
          onClick={() => navigate("/AddTodolist")}
        >
          Add +
        </button>
        <div className="flex flex-wrap justify-start gap-2 gap-y-3">
          <ListsComponent data={toDolist} onDelete={onDelete} />
        </div>
      </div>
    </>
  );
};

export default List;
