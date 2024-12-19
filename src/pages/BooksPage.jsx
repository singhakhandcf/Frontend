import axios from "axios";
import { useEffect, useState } from "react";
import Book from "../components/Book";
import { useOutletContext } from "react-router-dom";

const genresList = [
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Romance",
  "Science-Fiction",
  "Mystery",
  "Thriller",
  "Comedy",
  "SelfHelp",
  "Revolutionary",
];

const BooksPage = () => {
  const { user } = useOutletContext();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const toggleGenre = (selectedGenre) => {
    setGenre((prev) => {
      const genres = prev.split(" ").filter(Boolean);
      if (genres.includes(selectedGenre)) {
        return genres.filter((g) => g !== selectedGenre).join(" ");
      } else {
        return [...genres, selectedGenre].join(" ");
      }
    });
    setPage(1);
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/books`, {
        params: { page, limit, search, genre },
        withCredentials: true,
      });
      setBooks(response.data.data.books);
      console.log(response.data.data);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(fetchBooks, 500);
    return () => clearTimeout(debounceFetch);
  }, [page, limit, search, genre, user]);

  return (
    <div className="relative p-4 lg:p-10 z-0 ">
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => {setSearch(e.target.value);setPage(1);}}
          className="border p-2 rounded-md w-full"
        />
      </div>

      <div className="mb-4  flex flex-wrap  gap-2">
        {genresList.map((g) => (
          <button
            key={g}
            onClick={() => toggleGenre(g)}
            className={`p-1 lg:px-4 lg:py-2 rounded-md ${
              genre.split(" ").includes(g)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {g}
          </button>
        ))}

        {genre && (
          <button
            onClick={() => setGenre("")}
            className="px-4  py-2 rounded-md bg-red-500 text-white"
          >
            Clear Genre
          </button>
        )}
      </div>

      {loading ? (
        <div className="min-w-full flex justify-center items-center">
          {" "}
          <div className="mt-20 h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        </div>
      ) : books.length == 0 ? (
        <div className="text-gray-700 text-xl w-[100%] text-center">NO BOOKS FOUND ! :(</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
            {books.map((book) => (
              <Book key={book._id} book={book} />
            ))}
          </div>
          <div className="mt-8 w-full bottom-10 flex justify-center">
            {page === 1 ? (
              ""
            ) : (
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 mx-2"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0  16 16"
                  height="2em"
                  width="2em"
                >
                  <path d="M16 14a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12a2 2 0 012 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708-.708L5.707 8.5H11.5a.5.5 0 000-1z" />
                </svg>
              </button>
            )}
            <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
            {page === totalPages ? (
              ""
            ) : (
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 mx-2"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="2em"
                  width="2em"
                >
                  <path d="M0 14a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2a2 2 0 00-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5a.5.5 0 010-1z" />
                </svg>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BooksPage;