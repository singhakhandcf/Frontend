import axios from "axios";
import React, {  useState } from "react";
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Cant confirm new password");
      setNewPassword("");
      setConfirmPassword("");
      setOldPassword("");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/users/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true },
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Password Updated")
        setError("");
        setConfirmPassword("");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.log(error.response?.data);
    
      toast.error("Error Occured")
      setConfirmPassword("");
      setOldPassword("");
      setNewPassword("");
      
      console.log(error);
    }
  };

  return (
    <>
      
      <div >
        <form className="flex flex-col gap-2" onSubmit={handleChangePassword}>
          {error && <p className=" py-1 text-red">{error}</p>}
        

          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Old Password
            </label>
            <input
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Confirm New Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-4.5">
           
            <button
              className="flex justify-center rounded bg-blue-500 text-white px-6 py-2 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              onClick={handleChangePassword}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordForm;