import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate,  useParams } from "react-router-dom";

function UpdateBook() {
  
  let { id } = useParams();
  const [displayImage,setDisplayImage]=useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
  });
  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (coverImage) {
      formDataToSend.append("coverImage", coverImage);
    }

    try {
      const response=await axios.patch(`${import.meta.env.VITE_URL}/books/update/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Book updated successfully!");
      setFormData({
        title: "",
        author: "",
        description: "",
        genre: "",
      });
      console.log(response.data.data);
      setCoverImage(null);
      setLoading(false);
      navigate(`../books/${response.data.data._id}`)
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to update book. Try again.");
    }
  };

  useEffect(() => {
    const getBook = async () => {
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/books/${id}`,
          {
            withCredentials: true,
          }
        );
        setFormData({
          title: response.data.data.title,
          author: response.data.data.author,
          description: response.data.data.description,
          genre: response.data.data.genre,
        })
        console.log(response.data.data);
        setDisplayImage(response.data.data.coverImage)
        
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="p-8 grid grid-cols-1  lg:grid-cols-3">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img className="w-[200px]" src={displayImage} alt="" />
        <span className="text-gray-600 italic text-xs">*To change this cover image upload a new cover Image </span>
      </div>
      <div className="max-w-xl mx-auto lg:col-span-2">
      <h1 className="text-2xl text-gray-700 font-bold mb-4">Update Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="file"
          name="coverImage"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading?"Updating...":"Submit"}
        </button>
      </form>
    </div>
    </div>
  );
}

export default UpdateBook;