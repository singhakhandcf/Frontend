import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Loader from "../components/Loader";
const SingleBookPage = () => {
  const { user , setUser} = useOutletContext();
  const [bookLoading,setBookLoading]=useState(false);
  const [loading,setLoading]=useState(false);
  const contentRef = useRef(null);
  console.log(user);
  let { id } = useParams();
  const [book, setBook] = useState({});
  const navigate=useNavigate();
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const content = contentRef.current?.value;
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/books/${id}/comment`,
        { content: content },
        { withCredentials: true }
      );
      console.log(response);
      toast.success("Comment Added");
      setBook(response.data.data);
      contentRef.current.value = "";
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleWishlist=async()=>{
    try {
        
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/books/toggleWishlist/${id}`,
          { withCredentials: true }
        );
        console.log(response);
        toast.success("Updated Wishlist");
        setUser(response.data.data);
        contentRef.current.value = "";
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }

  const handleDelete=async()=>{
    await axios.delete(
      `${import.meta.env.VITE_URL}/books/delete/${id}`,
      {
        withCredentials: true,
      }
    ).then(()=>{
      toast.success("Book Deleted Successfully")
      navigate("../books")
    });
  }
  const handleUpdate=async()=>{
    
   navigate(`../books/update/${id}`)
  }
  useEffect(() => {
    const getBook = async () => {
      setBookLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/books/${id}`,
          {
            withCredentials: true,
          }
        );
        setBook(response.data.data);
        console.log(response.data.data);
        setBookLoading(false);
      } catch (error) {
        toast.error("Something went wrong")
        setBookLoading(false);
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
    {bookLoading?<Loader/>:""}
    <div className={`bg-gray-100  py-8 ${bookLoading?"hidden":""}`}>
      
      {
        user.isAdmin?<div className="px-8 text-sm pb-4 flex items-center gap-4 justify-end">
        <span className="text-gray-500">ADMIN CONTROLS : </span>
        <button onClick={handleUpdate} className="border-2 p-1 rounded-sm text-emerald-400 border-emerald-400">UPDATE</button>
        <button onClick={handleDelete} className="border-2 p-1 px-2 rounded-sm text-red-500 border-red-500">DELETE</button>
       
      </div>:""
      }

      <div className="  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex bg-white flex-col md:flex-row ">
          <div className=" ">
            <div className="flex justify-center items-center lg:max-w-[250px] ">
              <img className=" object-cover" src={book?.coverImage} />
            </div>
          </div>
          <div className="md:flex-1 px-4 py-2">
            <div className="flex items-center justify-between">
              <h2 className=" text-2xl md:text-3xl font-bold text-gray-800  mb-2">
                {book?.title}
              </h2>
              <div className="cursor-pointer" onClick={handleWishlist}>
                {
                    user?.wishlist?.includes(id)?<svg width="30px" height="30px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#ef2525"></path> </g>
                    </svg>: <svg width="30px" height="30px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#d6d6d6"></path> </g>
                    </svg>
                }
              
             
              </div>
            </div>
            <p className="text-gray-600  text-sm mb-4">by {book.author}</p>

            <div className="mb-4">
              <span className="font-bold text-gray-800 ">Description :</span>
              <p className="text-gray-7 text-sm mt-2">{book?.description}</p>
            </div>

            <div className="text-lg text-bold">
              <span className="font-bold text-gray-800 ">Genre :</span>
              <span className="mx-1 px-2 border-2 border-emerald-400 py-1 text-emerald-400 text-sm rounded-md">
                {book?.genre}
              </span>
            </div>
          </div>
        </div>
      </div>
      <section className="   mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className=" bg-white px-4">
          <form
            onSubmit={handleAddComment}
            className="py-4 flex w-[100%] gap-2 min-w-[100%]"
          >
            <div className="py-2 w-[90%] px-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <input
                ref={contentRef}
                id="comment"
                rows="2"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></input>
            </div>
            <button
              type="submit"
              className="  lg:w-[10%]  px-4 flex justify-center font-medium text-pretty text-center   items-center text-white bg-blue-700 rounded-lg hover:bg-primary-800"
            >
              Post
            </button>
          </form>
          {book?.comments?.map((comment, idx) => {
            return (
              <article
                key={idx}
                className="p-6 mb-3 text-base bg-white rounded-lg"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3  text-gray-900 ">
                     @{comment.user.username}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.content}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
    </>
  );
};

export default SingleBookPage;