// import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { adminMenuGroups, menuGroups } from "../assets/constant";
import Header from "../components/Header";
const DashboardLayout = () => {
  const navigate = useNavigate();
  const allCookies = Cookies.get();
  const [user, setUser] = useState({});
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };
  const signOut = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_URL}/users/logout`, {
          withCredentials: true,
        })
        .then(() => {
          setUser(null);
          navigate("/auth/login");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const setUserUsingtokens = async () => {
    try {
      const accessToken = allCookies.accessToken;
      const refreshToken = allCookies.refreshToken;
      console.log(getCookie("accessToken"));
      console.log(accessToken, refreshToken);
      if (accessToken == undefined && refreshToken != undefined) {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_URL}/users/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            withCredentials: true,
          }
        );
        setUser(refreshResponse.data.data.user);
        console.log(refreshResponse.data.data.user, "refreshed");
      } else if (accessToken != undefined && refreshToken != undefined) {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/users/current-user`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data, "not refreshed");
        setUser(response.data.data);
      } else {
        navigate("/auth/login");
      }
      console.log(user);
    } catch (error) {
      signOut();
      console.log(error);
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    setUserUsingtokens();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-9999 w-[70%] lg:w-64 bg-gray-800 text-white h-full transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-2xl px-2 flex justify-between items-center font-bold">
            <span className="flex gap-3 items-center">
              <svg
                className="h-6 w-6"
                viewBox="-1 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 3V2C6 0.89543 6.89543 0 8 0H12C13.1046 0 14 0.89543 14 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H14C13.6357 22 13.2942 21.9026 13 21.7324C12.7058 21.9026 12.3643 22 12 22H8C7.63571 22 7.29417 21.9026 7 21.7324C6.70583 21.9026 6.36429 22 6 22H2C0.89543 22 0 21.1046 0 20V5C0 3.89543 0.89543 3 2 3H6z"
                  fill="#758CA3"
                />
              </svg>
              <span>LIBRARY</span>
            </span>
            <span className="lg:hidden" onClick={toggleSidebar}>
              <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                <path
                  fill="currentColor"
                  d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
                />
              </svg>
            </span>
          </h2>
          <ul className="mt-8 space-y-2">
            {menuGroups.map((item, idx) => (
              <li
                onClick={() => {
                  navigate(item.route);
                }}
                key={idx}
                className="flex cursor-pointer gap-6 items-center hover:bg-gray-700 p-2 rounded"
              >
                <div className="flex justify-center items-center max-w-4 max-h-4">
                  {item.icon}
                </div>
                <div>{item.label}</div>
              </li>
            ))}
          </ul>
          {!user?.isAdmin ? (
            ""
          ) : (
            <>
              <div className="text-sm text-gray-500 py-2">ADMIN MENU</div>
              <ul className="space-y-2">
                {adminMenuGroups.map((item, idx) => (
                  <li
                    onClick={() => {
                      navigate(item.route);
                    }}
                    key={idx}
                    className="flex cursor-pointer gap-6 items-center hover:bg-gray-700 p-2 rounded"
                  >
                    <div className="flex justify-center items-center max-w-4 max-h-4">
                      {item.icon}
                    </div>
                    <div>{item.label}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-0 lg:ml-64 flex-1 ">
        <Header
          username={user?.username}
          setIsMenuOpen={setIsMenuOpen}
          signOut={signOut}
          isMenuOpen={isMenuOpen}
        />
        <div>
          <Outlet context={{ user: user, setUser: setUser }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
