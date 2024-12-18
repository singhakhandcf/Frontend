import { useNavigate } from "react-router-dom";

const Book = ({book}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>{navigate(`/dashboard/books/${book._id}`)}} className="cursor-pointer lg:max-w-[200px]  bg-white border border-gray-200 rounded-lg shadow">
      <div>
        <img
          className="rounded-t-lg w-[100%] bg-cover"
          src={book.coverImage}
          alt=""
        />
      </div>
      <div className="p-1">
        <a href="#">
          <h5 className=" text-lg font-medium text-gray-900 ">
            {book.title}
          </h5>
        </a>
        <p className=" font-normal text-gray-700 ">
          {book.author}
        </p>
        
      </div>
    </div>
  );
};

export default Book;