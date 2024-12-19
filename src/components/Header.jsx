import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const Header = ({ username, signOut,     setIsMenuOpen, isMenuOpen }) => {
  const navigate=useNavigate();
    Header.propTypes = {
        username: PropTypes.string.isRequired,
        signOut: PropTypes.func.isRequired,
        setIsMenuOpen: PropTypes.func.isRequired,
        isMenuOpen: PropTypes.bool.isRequired,
      };
    
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <header className="w-[100%] h-16 bg-white shadow-md  flex justify-between lg:justify-end items-center   ">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="py-2 px-2 h-16  text-gray-500  md:hidden"
      >
        {isMenuOpen ? (
          "Close"
        ) : (
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="2em"
            width="2em"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M96 256h320M96 176h320M96 336h320"
            />
          </svg>
        )}
      </button>
      <div className="px-4">
        <div className=" text-left">
          <div>
            <button
              onClick={() => {
                setOpenDropdown(!openDropdown);
              }}
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold  hover:bg-gray-100 text-gray-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-400"
                height="1.5em"
                width="1.5em"
              >
                <path d="M12 2A10.13 10.13 0 002 12a10 10 0 004 7.92V20h.1a9.7 9.7 0 0011.8 0h.1v-.08A10 10 0 0022 12 10.13 10.13 0 0012 2zM8.07 18.93A3 3 0 0111 16.57h2a3 3 0 012.93 2.36 7.75 7.75 0 01-7.86 0zm9.54-1.29A5 5 0 0013 14.57h-2a5 5 0 00-4.61 3.07A8 8 0 014 12a8.1 8.1 0 018-8 8.1 8.1 0 018 8 8 8 0 01-2.39 5.64z" />
                <path d="M12 6a3.91 3.91 0 00-4 4 3.91 3.91 0 004 4 3.91 3.91 0 004-4 3.91 3.91 0 00-4-4zm0 6a1.91 1.91 0 01-2-2 1.91 1.91 0 012-2 1.91 1.91 0 012 2 1.91 1.91 0 01-2 2z" />
              </svg>
              {username}
              <svg
                className="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div onClick={()=>{setOpenDropdown(!openDropdown)}}
            className={` ${
              !openDropdown && "hidden"
            } absolute  right-0 z-10 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <button
                onClick={()=>{navigate("/dashboard/account")}}
                href="#"
                className="block w-[100%]  text-start hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                Account settings
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signOut();
                }}
                role="none"
              >
                <button
                  type="submit"
                  className="block hover:bg-gray-100 w-full px-4 py-2 text-left text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;