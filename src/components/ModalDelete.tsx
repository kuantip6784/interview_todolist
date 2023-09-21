import { Dialog, Transition } from "@headlessui/react";
import { IPropsModal } from "interfaces/todo.interface";
import { Fragment, useState } from "react";
import api from "services";

const ModalDelete = ({ item, onNewLoading }: IPropsModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onDelete = async () => {
    try {
      const res = await api.delete(item._id);
      if (res.status === 200) {
        onNewLoading();
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center">
        <svg
          onClick={openModal}
          className="w-6 h-6 text-red-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
        </svg>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-999" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className=" flex justify-between">
                    <p className=" text-lg font-bold leading-6 text-red-500 mb-4">
                      Are you sure you want to delete this (${item.title})
                    </p>
                    <div
                      onClick={closeModal}
                      className=" cursor-pointer text-gray-400 text-lg"
                    >
                      X
                    </div>
                  </Dialog.Title>
                  <div className=" flex gap-2 mt-3 justify-end">
                    <button
                      className="flex items-center gap-2 rounded-md font-bold bg-gradient-to-l from-fuchsia-500 to-red-500 px-4 py-2 text-sm text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      onClick={onDelete}
                    >
                      <svg
                        className="w-4 h-4 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                      </svg>{" "}
                      Delete
                    </button>
                    <button
                      onClick={closeModal}
                      className="rounded-md font-bold bg-gradient-to-l from-cyan-500 to-blue-500 px-4 py-2 text-sm text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDelete;
