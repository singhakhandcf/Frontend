import React from 'react'
import ChangePasswordForm from './ChangePasswordForm';

const Modal = ({setShow}) => {
  return (
    <div className="fixed inset-0 z-999999 flex  h-full w-full items-center justify-center overflow-y-auto bg-white bg-opacity-30">
      <div className=" w-[100%]  lg:w-[50%] bg-white dark:bg-gray-800 ">
        <div className="flex w-[100%] justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className=" font-bold text-black dark:text-white">Change Password</h3>
          <button
            type="button"
            title="ADD"
            onClick={() => {
              setShow(false);
            }}
            className="text-bold text-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="text-black dark:text-white"
              fill="none"
            >
              <path
                d="M15 9L9 14.9996M15 15L9 9.00039"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
        <div className="p-7">
          <ChangePasswordForm/>
        </div>
      </div>
    </div>
  )
}

export default Modal