import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import api from "services";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const AddTodolist = ({
  title,
  type,
  item,
}: {
  title: string;
  type: string;
  item?: any;
}) => {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    title: yup.string().required().max(60),
    description: yup.string().required().max(60),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (type === "update") {
          const res = await api.update(item?._id, values);
          if (res.status === 200) {
            navigate("/list");
          }
        }
        if (type === "create") {
          const res = await api.create(values);
          if (res.status === 200) {
            formik.resetForm();
            alert("เพิ่มสำเร็จ");
          }
        }
      } catch (err) {
        alert("You can't add todolist 😭");
      }
    },
  });

  useEffect(() => {
    if (type === "update") {
      formik.setValues({
        title: item?.title,
        description: item?.description,
      });
    }
  }, [item]);

  return (
    <>
      <div className=" w-[25%] border-2 px-5 py-3 rounded-lg">
        <form onSubmit={formik.handleSubmit}>
          <p>{title}</p>
          <InputComponent
            label={"title"}
            type="text"
            value={formik.values.title}
            onChanges={(e) => formik.setFieldValue("title", e.target.value)}
            error={formik.errors.title && formik.touched.title}
          />
          <InputComponent
            label={"description"}
            type="text"
            value={formik.values.description}
            onChanges={(e) =>
              formik.setFieldValue("description", e.target.value)
            }
            error={formik.errors.description && formik.touched.description}
          />
          <div className=" flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg mt-3"
            >
              add
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-amber-500 text-white rounded-lg mt-3"
              onClick={() => navigate("/list")}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTodolist;
