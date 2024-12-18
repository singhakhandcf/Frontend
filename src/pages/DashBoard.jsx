import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Book from "../components/Book";
import Modal from "../components/Modal";

const DashBoard = () => {
  const { user } = useOutletContext();
  const [wishlist,setWishlist]=useState([]);
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const getWishList=async()=>{
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/books/wishlist`,
          { withCredentials: true }
        );
        console.log(response);
        setWishlist(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getWishList();

  },[])
  return (
    <>
    {show && <Modal setShow={setShow}/>}
      <div className="px-4 ">
      
      <div className="px-7 my-10 rounded-xl border bg-white  shadow-sm   ">
        <div className="mb-2 flex flex-col   py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <svg
              
              width="64px"
              height="64px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                  fill="#aaa7a7"
                ></path>{" "}
                <path
                  d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                  fill="#aaa7a7"
                ></path>{" "}
              </g>
            </svg>
            <div className="ml-4 w-56">
              <p className="text-slate-800 text-xl font-extrabold">
                {user.fullName}
              </p>
              <p className="text-slate-500 text-sm">@{user.username}</p>
              <p className="text-slate-500">Email : {user.email}</p>
              <button className="text-blue-400" onClick={()=>setShow(true)}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-700 text-xl font-bold">MY WISHLIST</div>
      <div className="grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-6 gap-2">
        {wishlist.length==0?"No Books Wishlisted":""}
        {
         wishlist.map((book)=>{
            return <Book key={book._id} book={book}/>
          })
        }
      </div>
    </div>
    </>
  );
};

export default DashBoard;