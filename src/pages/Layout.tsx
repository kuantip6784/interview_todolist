import { useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const Token = Cookies.get("token");

  useEffect(() => {
    if (Token === undefined) {
      navigate("/login");
    }
  }, [location.pathname]);

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap shadow-lg p-2">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-between">
          <div className="flex">
            <div className="block mt-2 lg:inline-block lg:mt-0 text-black text-lg mr-2 hover:bg-slate-300 px-4 py-3 rounded-lg">
              <Link to="/list">Home</Link>
            </div>
            <div className="block mt-2 lg:inline-block lg:mt-0 text-black text-lg mr-2 hover:bg-slate-300 px-4 py-3 rounded-lg">
              <Link to="/AddTodolist">Add</Link>
            </div>
          </div>
          {Token ? (
            <div className="block mt-2 lg:inline-block lg:mt-0 text-black text-lg hover:bg-slate-300 px-4 py-3 rounded-lg">
              <div onClick={logout}>logout</div>
            </div>
          ) : (
            <div className="block mt-2 lg:inline-block lg:mt-0 text-black text-lg hover:bg-slate-300 px-4 py-3 rounded-lg">
              <Link to="/login">login</Link>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
