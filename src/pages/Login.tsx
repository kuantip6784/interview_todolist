import React, { useState } from "react";
import InputComponent from "components/InputComponent";
import api from "services";
import { IAuth } from "interfaces/auth.interfacr";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      if (username !== "" && password !== "") {
        const data = {
          username,
          password,
        };
        const res = await api.auth(data);
        if (res.status === 200) {
          Cookies.set("token", res?.data?.token);
          navigate("/list");
          window.location.reload();
        }
      }
    } catch (err) {
      alert("user not found");
    }
  };
  return (
    <div className="container mx-auto mt-10">
      <div className="flex container justify-center">
        <div className=" w-[25%] border-2 px-5 py-3 rounded-lg">
          <p className=" text-center">Login</p>
          <InputComponent
            label={"user name"}
            type="text"
            value={username}
            onChanges={(e: any) => setUsername(e.target.value)}
          />
          <InputComponent
            label={"password"}
            type="password"
            value={password}
            onChanges={(e: any) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg mt-3"
            onClick={onSubmit}
          >
            login
          </button>
          <p>interview@mail.com</p>
          <p>12345678</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
