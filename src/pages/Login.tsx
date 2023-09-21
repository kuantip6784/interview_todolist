import React from "react";
import InputComponent from "components/InputComponent";
import api from "services";
// import { IAuth } from "interfaces/auth.interfacr";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.auth(values);
        if (res.status === 200) {
          Cookies.set("token", res?.data?.token);
          navigate("/list");
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
        formik.setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      }
    },
  });

  return (
    <div className="flex items-center min-h-screen p-4 bg-white justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-none md:shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="hidden p-4 md:p-4 md:py-6 text-white bg-gradient-to-r from-cyan-400 to-blue-500 md:flex md:w-80 md:flex-shrink-0 md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-extrabold tracking-wider text-center">
            <p>Welcome</p>
          </div>
        </div>
        <div className="w-[300px] px-1 md:p-10 md:bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form
            className="flex flex-col space-y-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col space-y-5">
              <InputComponent
                label={"user name"}
                type="text"
                value={formik.values.username}
                onChanges={(e) =>
                  formik.setFieldValue("username", e.target.value)
                }
                error={formik.errors.username && formik.touched.username}
              />
              {formik.errors.username && formik.touched.username && (
                <p className=" text-sm text-red-500" style={{ marginTop: 3 }}>
                  {formik.errors.username}
                </p>
              )}

              <InputComponent
                label={"password"}
                type="password"
                value={formik.values.password}
                onChanges={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
                error={formik.errors.password && formik.touched.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-red-500" style={{ marginTop: 3 }}>
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md shadow"
              >
                Log in
              </button>
              <a
                href="https://nevers-todo-register.firebaseapp.com/"
                target="_blank"
                rel="noreferrer"
              >
                <p className="flex mt-3 items-center gap-2 justify-end text-sm text-blue-500 text-right cursor-pointer">
                  Reginster
                  <svg
                    className="w-3 h-3 text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                </p>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
