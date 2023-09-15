import { useParams } from "react-router-dom";
import FormTodolist from "components/FormTodolist";
import api from "services";
import { useEffect, useState } from "react";

const UpdatePage = () => {
  const { id } = useParams();
  const split_id = id?.split(":")[1]; // เฉพาะ id มาเป็น string มันเลยมี : มาด้วย
  const [item, setItem] = useState<any>({});
  const getDateById = async () => {
    try {
      if (split_id) {
        const res = await api.getById(split_id);
        if (res.status === 200) {
          setItem(res.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDateById();
  }, [split_id]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex container justify-center">
        <FormTodolist title={"Edit todo"} type={"update"} item={item} />
      </div>
    </div>
  );
};

export default UpdatePage;
