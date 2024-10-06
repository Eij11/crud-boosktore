import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  //window pop ups
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5100/api/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted succesfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />

      <h1 className="fs-3 my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}

      <div className="d-flex flex-column align-items-center border border-2 border-primary p-4 mx-auto w-50">
        <h3 className="fs-4">Sure ka na idelete?</h3>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteBook}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
