import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const Token = Cookies.get("token");

  useEffect(() => {
    if (Token === undefined) {
      navigate("/login");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (Token !== undefined) {
      navigate("/list");
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <>
      <div className=" fixed top-0 p-3 border-[1px] w-full">
        <div className=" container max-w-screen-md mx-auto">
          {isOpen === false ? (
            <svg
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          ) : (
            <div className=" h-[20px]"></div>
          )}
        </div>
      </div>
      <main
        className={
          " fixed overflow-hidden z-10 bg-gradient-to-l bg-opacity-25 inset-0 transform ease-in max-w-xs" +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-200 opacity-0 translate-x-full w-0 right-0")
        }
      >
        <section
          className={
            " w-screen max-w-xs left-0 absolute  bg-gradient-to-l from-cyan-500 to-blue-500  h-full shadow-xl delay-400 duration-500 ease-in transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative w-screen max-w-xs p-5 flex flex-col space-y-3 h-full pt-10">
            <button
              className=" absolute right-[-15px] top-10 bg-blue-500 z-100 pl-1 pr-5 font-bold text-lg text-right text-white py-1 w-[40px] h-[40px] rounded-xl bg-p"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                />
              </svg>
            </button>
            <div className="flex items-center p-2 text-white rounded-lg group dark:hover:bg-gray-700 group cursor-pointer">
              <svg
                className="flex-shrink-0 w-5 h-5 text-white transition duration-75 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">List</span>
            </div>
            <div
              className="flex items-center p-2 text-white rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
              onClick={logout}
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-white transition duration-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Sign out</span>
            </div>
          </article>
        </section>
      </main>

      <div className="p-4 mt-12 md:mt-[100px]">
        <div className="flex items-center justify-center mb-4 rounded">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
