import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const passwordRef = useRef(null);
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;
    const fullName = fullNameRef.current?.value;

    if (!email || !password) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/users/register`,
        { email, password , username , fullName },
        { withCredentials: true }
      );
      console.log(response);
      toast.success("Resitered Successfully , Please Login");
      navigate("/auth/login");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex min-h-full h-screen    items-center flex-col justify-center px-6 my-12 lg:px-8">
      <div className="p-8 border flex flex-col shadow-md min-w-[400px] ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegisterUser} className="space-y-2" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                ref={usernameRef}
                  type="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="FullName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Full Name{" "}
              </label>
              <div className="mt-2">
                <input
                  ref={fullNameRef}
                  type="FullName"
                  name="FullName"
                  id="FullName"
                  autoComplete="FullName"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading?"Signing Up ...":"Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member ?
            <NavLink
              to="/auth/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              end
            >
              {" "}
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;