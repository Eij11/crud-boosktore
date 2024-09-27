import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for preview
  const [loading, setLoading] = useState(false);

  //window pop ups
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBookImage(file);
    // Generate a preview URL for the selected image
    setImagePreview(URL.createObjectURL(file));
  };
  const handleSaveBook = (e) => {
    console.log(bookImage);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("genre", genre);
    formData.append("publishYear", publishYear);
    if (bookImage) {
      formData.append("bookImage", bookImage);
    }

    //on onChange, better readability
    const handleSetTitle = (event) => {
      setTitle(event.target.value);
    };

    setLoading(true);
    axios
      .post("http://localhost:5000/api/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        enqueueSnackbar("Book created succesfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="fs-3 my-4">Create Book</h1>

      {loading ? <Spinner /> : ""}

      <div className="d-flex flex-column border border-3 border-primary rounded p-4 mx-auto w-50">
        <div className="my-4">
          <label htmlFor="" className="fs-4 text-secondary-emphasis">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control form-control-lg border border-0 border-bottom border-primary border-3"
          />

          <label htmlFor="" className="fs-5 text-secondary-emphasis mt-4">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control border border-0 border-bottom border-primary border-3"
          />

          <label htmlFor="" className="fs-5 text-secondary-emphasis mt-4">
            Publish Year
          </label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="form-control border border-0 border-bottom border-primary border-3"
          />

          <label className="fs-5 text-secondary-emphasis mt-4">Genre</label>
          {/* Genre Dropdown */}
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="form-control border border-0 border-bottom border-primary border-3"
          >
            <option value="">Select Genre</option>
            <option value="horror">Horror</option>
            <option value="fantasy">Fantasy</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="mystery">Mystery</option>
            <option value="non-fiction">Non-fiction</option>
          </select>

          <label className="fs-5 text-secondary-emphasis mt-4">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control border border-0 border-bottom border-primary border-3"
          />

          <label className="fs-5 text-secondary-emphasis mt-4">Image</label>
          <input
            type="file"
            onChange={handleImageChange} // Image preview handler
            className="form-control"
            accept="image/*"
          />

          {/* Image Preview Section */}
          {imagePreview && (
            <div className="mt-4">
              <label className="fs-5 text-secondary-emphasis mt-4">
                Image Preview
              </label>
              <div className="border p-2 rounded">
                <img
                  src={imagePreview}
                  alt="Book Preview"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <button
          className="btn btn-primary "
          type="submit"
          onClick={handleSaveBook}
        >
          Create Book
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
