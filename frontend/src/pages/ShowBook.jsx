import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5100/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
        console.log("Book set:", res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />

      <h1 className="fs-2 my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="d-flex flex-column border border-primary w-50 rounded object-fit-containt">
          <div className="my-1">
            <span className="fs-5 text-dark">Id:&nbsp; </span>
            <span>{book._id}</span>
          </div>
          <div className="my-1">
            <span className="fs-5 text-dark">Title:&nbsp;</span>
            <span>{book.title}</span>
          </div>
          <div className="my-1">
            <span className="fs-5 text-dark">Author:&nbsp;</span>
            <span>{book.author}</span>
          </div>
          <div className="my-1">
            <span className="fs-5 text-dark">Publish Year:&nbsp;</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-1">
            <span className="fs-5 text-dark">Created Time:&nbsp;</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-1">
            <span className="fs-5 text-dark">Last Update Time:&nbsp;</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
