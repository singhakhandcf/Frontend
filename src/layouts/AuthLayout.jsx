import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
const AuthLayout = () => {
  const navigate = useNavigate();
  const getCookie = () => {
    return Cookies.get();
  };
  useEffect(() => {
    let allCookies = getCookie();
    if (allCookies.accessToken || allCookies.refreshToken) {
      navigate("/dashboard/home");
    }
  }, []);

  return (
    < >
      <Outlet />
    </>
  );
};

export default AuthLayout;