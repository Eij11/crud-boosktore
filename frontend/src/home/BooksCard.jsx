import { Link } from "react-router-dom";
import React, { useState } from "react";

//icons
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

import BookModal from "../components/BookModal";

const BooksCard = ({ books, search }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // Track which book is selected

  const handleShowModal = (book) => {
    setSelectedBook(book); // Set the selected book
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null); // Clear the selected book when modal closes
  };

  return (
    <div className="row">
      {books //makes the search function work
        .filter((book) => {
          return search.toLowerCase() === ""
            ? book
            : book.title.toLowerCase().includes(search.toLowerCase());
        })
        .map((book) => (
          <div
            key={book._id}
            className="col-lg-3 col-md-4 col-sm-6 col-12 px-3 py-2"
          >
            <div className="card h-100">
              <img src="..." className="card-img-top" alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                <p className="card-text">Published: {book.publishYear}</p>

                <div className="d-flex grid gap-0 column-gap-3">
                  <span
                    onClick={() => handleShowModal(book)}
                    style={{ cursor: "pointer" }}
                  >
                    <BiShow className="text-primary fs-3" />
                  </span>
                  <Link to={`/books/detail/${book._id}`}>
                    <BsInfoCircle className="text-dark fs-3" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-warning fs-3" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-danger fs-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

      {showModal && selectedBook && (
        <BookModal book={selectedBook} onclose={handleCloseModal} />
      )}
    </div>
  );
};

export default BooksCard;
