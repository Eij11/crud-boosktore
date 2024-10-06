import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  //window pop ups
  const { enqueueSnackbar } = useSnackbar();

  //handleEditBook: Function to handle the book editing process.
  //data: Creating an object with the updated book details.
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5100/api/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book editted succesfully!", { variant: "success" });
        navigate("/"); // This line uses the navigate function to redirect to the home page
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const { id } = useParams();

  //axios.get: Making a GET request to fetch the book details.
  //setTitle, setAuthor, setPublishYear: Updating the state variables with the fetched data.
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5100/api/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="fs-3 my-4">Edit Book</h1>

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
        </div>

        <button
          className="btn btn-primary "
          type="submit"
          onClick={handleEditBook}
        >
          Edit Book
        </button>
      </div>
    </div>
  );
};

export default EditBook;
