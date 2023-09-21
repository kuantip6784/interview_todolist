import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "services";

const ModalUpdate = ({
  item,
  onNewLoading,
}: {
  item?: any;
  onNewLoading: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const closeModal = () => {
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
        const res = await api.update(item?._id, values);
        if (res.status === 200) {
          onNewLoading();
          closeModal();
        }
      } catch (err) {}
    },
  });

  useEffect(() => {
    formik.setValues({
      title: item?.title,
      description: item?.description,
    });
  }, [item]);

  return (
    <>
      <svg
        onClick={openModal}
        className="w-6 h-6 text-purple-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
      </svg>

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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className=" flex justify-between">
                    <p className=" text-lg font-bold leading-6 text-gray-900 mb-4">
                      Update Todo {item.title}
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
                    <InputComponent
                      label={"description"}
                      type="text"
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
                        Update
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

export default ModalUpdate;
