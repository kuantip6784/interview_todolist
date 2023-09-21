import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import InputComponent from "./InputComponent";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "services";
import TextareComponent from "./TextareComponent";
import { IPropsModal } from "interfaces/todo.interface";

const FormModal = ({ onNewLoading }: IPropsModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const closeModal = () => {
    formik.resetForm();
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.create(values);
        if (res.status === 200) {
          formik.resetForm();
          onNewLoading();
          closeModal();
        }
      } catch (err) {}
    },
  });

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          onClick={openModal}
          className="font-extrabold text-lg bg-white px-4 py-2 text-black w-full mb-5 shadow-lg rounded-[100px]"
        >
          Add +
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className=" flex justify-between">
                    <p className=" text-lg font-bold leading-6 text-gray-900 mb-4">
                      Create Todo list
                    </p>
                    <div
                      onClick={closeModal}
                      className=" cursor-pointer text-gray-400 text-lg"
                    >
                      X
                    </div>
                  </Dialog.Title>
                  <form onSubmit={formik.handleSubmit}>
                    <InputComponent
                      label={"title"}
                      type="text"
                      value={formik.values.title}
                      onChanges={(e) =>
                        formik.setFieldValue("title", e.target.value)
                      }
                      error={formik.errors.title && formik.touched.title}
                    />
                    {formik.errors.title && formik.touched.title && (
                      <p
                        className=" text-sm text-red-500"
                        style={{ marginTop: 3 }}
                      >
                        {formik.errors.title}
                      </p>
                    )}
                    <TextareComponent
                      label={"description"}
                      value={formik.values.description}
                      onChanges={(e) =>
                        formik.setFieldValue("description", e.target.value)
                      }
                      error={
                        formik.errors.description && formik.touched.description
                      }
                    />
                    {formik.errors.description &&
                      formik.touched.description && (
                        <p
                          className="text-sm text-red-500"
                          style={{ marginTop: 3 }}
                        >
                          {formik.errors.description}
                        </p>
                      )}
                    <div className=" flex gap-3 justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-blue-600 text-white rounded-lg mt-3 font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FormModal;
