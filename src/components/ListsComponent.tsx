import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import dayjs from "dayjs";
import { IPropsModal, ITodolist } from "interfaces/todo.interface";

const ListsComponent = ({ item, onNewLoading }: IPropsModal) => {
  const sort =
    item && item.sort((a: any, b: any) => (a.updatedAt < b.updatedAt ? 1 : -1));

  return (
    <>
      {sort?.map((item: ITodolist, index: number) => {
        return (
          <div
            className="border-[1px] border-white shadow-2xl w-full md:w-[48%] rounded-xl px-4 py-2 mb-3 bg-white text-black"
            key={index}
          >
            <div className="flex justify-between my-2 cursor-pointer">
              <p className="text-base font-normal text-[#666]">
                {item.title || "-"}
              </p>
              <div className=" flex gap-5">
                <ModalUpdate item={item} onNewLoading={onNewLoading} />
                <ModalDelete item={item} onNewLoading={onNewLoading} />
              </div>
            </div>
            <div className=" ">
              <p className="text-xl font-bold mb-3 text-[#333]">
                {item.description || "-"}
              </p>
            </div>
            <hr className=" my-2" />
            <p className=" text-sm font-bold text-right">
              {dayjs(item?.updatedAt).format("DD-MM-YYYY h:mm A")}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default ListsComponent;
