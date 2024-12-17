// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react"
import Book from "../components/Book";

const BooksPage = () => {
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [limit] = useState(2);
  const [books,setBooks] =useState([]);
  const [loading, setLoading] = useState(false);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  
  useEffect(() => {
    const getAllBooks=async()=>{
      setLoading(true);
      try {
        const response=await axios
          .get(`${import.meta.env.VITE_URL}/books?page=${page}&limit=${limit}`, {
            withCredentials: true,
          })
        console.log(response.data.data.books);
        setBooks(response.data.data.books)
        setTotalPages(response.data.data.total)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllBooks();
  }, [page, limit])
  

  return (
    <div className="p-10">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
        {
          books.map((book)=>{
            return <Book key={book._id} book={book}/>
          })
        }
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              {
                page==1?"":<svg
                fill="currentColor"
                viewBox="0 0  16 16"
                height="2em"
                width="2em"
              >
                <path d="M16 14a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12a2 2 0 012 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708-.708L5.707 8.5H11.5a.5.5 0 000-1z" />
              </svg>
              }
            </button>
            <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              {page == totalPages ? (
                ""
              ) : (
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="2em"
                  width="2em"
                >
                  <path d="M0 14a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2a2 2 0 00-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5a.5.5 0 010-1z" />
                </svg>
              )}
            </button>
          </div>
    </div>
  )
}

export default BooksPage