import { IIputprops } from "interfaces/input.interface";
import React from "react";

const TextareComponent = ({
  label,
  value,
  onChanges,
  error = false,
}: IIputprops) => {
  return (
    <>
      <div className="container mx-auto mt-3">
        <div className="relative w-full">
          <textarea
            rows={5}
            id={label}
            className={`block text-md rounded-md font-semibold px-2.5 pb-2.5 pt-5 w-full border-[1px] focus:outline-none ${
              error ? " border-red-600" : ""
            } focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            value={value}
            onChange={onChanges}
          />
          <label
            htmlFor={label}
            className="absolute text-sm text-[#666] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            {label}
          </label>
        </div>
      </div>
    </>
  );
};

export default TextareComponent;
