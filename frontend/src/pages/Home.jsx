import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Spinner from "../components/Spinner";
// import BooksCard from "../home/BooksCard";
import BooksTable from "../home/BooksTable";
import BooksCard from "../home/BooksCard";
import Pagination from "../components/Pagination";
import GenreSort from "../components/GenreSort";
///icons
// https://react-icons.github.io/react-icons/search/#q=bsinfocir
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  //search function
  const [search, setSearch] = useState("");
  const handleSetSearch = (e) => {
    setSearch(e.target.value);
  };

  //category sort function
  const [selectedGenre, setSelectedGenre] = useState("");
  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  // Reset category/genre filter
  const handleClearGenre = () => {
    setSelectedGenre("");
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = books.slice(firstPostIndex, lastPostIndex);

  //http request
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        console.log("Api response:", res.data);
        setBooks(res.data);
        console.log("Books set:", res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-center text-center">
        <button
          type="button"
          className="btn btn-outline-primary me-3"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <form action="">
        <label className="form-label">Search Book</label>
        <input
          type="test"
          className="form-control"
          placeholder="Search Book"
          onChange={handleSetSearch}
        />
      </form>

      <GenreSort handleSelectGenre={handleSelectGenre} />

      {/* Show the cancel button if a genre is selected */}
      {selectedGenre && (
        <div className="d-flex align-items-center my-3">
          <h5>Selected Genre: {selectedGenre}</h5>
          <MdCancel
            className="ms-2"
            onClick={handleClearGenre}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fs-3 my-8">Book Lists</h1>

        <Link to={"/books/create"}>
          <MdOutlineAddBox className="text-dark fs-3" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable
          books={books}
          search={search}
          selectedGenre={selectedGenre}
        />
      ) : (
        //for pagination: currentPost
        <BooksCard books={currentPost} search={search} />
      )}

      <Pagination
        totalPosts={books.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
