import { useNavigate } from "react-router-dom";
import api from "services";

const ListsComponent = ({
  data,
  onDelete,
}: {
  data: any;
  onDelete: (e: any) => void;
}) => {
  const navigate = useNavigate();
  return (
    <>
      {data?.map((item: any, index: number) => {
        return (
          <div
            className="w-[30%] border-[1px] shadow-sm rounded-lg px-4 py-2"
            key={index}
          >
            <p className="text-base text-gray-500">title :</p>
            <p className="text-base mb-3">{item.title || "-"}</p>

            <p className="text-base text-gray-500">description</p>
            <p className="text-base">{item.description || "-"}</p>
            <button
              className=" bg-red-600 px-3 py-1 rounded-lg mt-3 text-white mr-4"
              onClick={() => onDelete(item._id)}
            >
              delete
            </button>
            <button
              className=" bg-blue-600 px-3 py-1 rounded-lg mt-3 text-white"
              onClick={() => navigate(`/update/:${item._id}`)}
            >
              update
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ListsComponent;
