import { Link } from "react-router-dom";

///icons
// https://react-icons.github.io/react-icons/search/#q=bsinfocir
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books, search, selectedGenre }) => {
  return (
    <table
      className="table w-100 table-bordered "
      style={{ borderSpacing: "10px", borderCollapse: "separate" }}
    >
      <thead>
        <tr>
          <th className="border border-dark rounded p-2 ">No</th>
          <th className="border border-dark rounded p-2">Title</th>
          <th className="border border-dark rounded p-2">Image</th>
          <th className="border border-dark rounded p-2">Category</th>
          <th className="border border-dark rounded p-2">Genre</th>
          <th className="border border-dark rounded p-2 d-none d-md-table-cell">
            Author
          </th>
          <th className="border border-dark rounded p-2 d-none d-md-table-cell">
            Publish Year
          </th>
          <th className="border border-dark rounded p-2">Operations</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(books) && books.length > 0 ? (
          books
            //makes the search function work
            .filter((book) => {
              return search.toLowerCase() === ""
                ? book
                : book.title.toLowerCase().includes(search.toLowerCase());
            })
            // Genre filter
            .filter((book) => {
              return selectedGenre.toLowerCase() === ""
                ? true
                : book.genre &&
                    book.genre.toLowerCase() === selectedGenre.toLowerCase();
            })
            .map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-dark rounded p-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-dark rounded p-2 text-center">
                  {book.title}
                </td>
                <td className="border border-dark rounded p-2 text-center d-none d-md-table-cell">
                  {book.bookImage ? (
                    <img
                      src={`http://localhost:5000/uploads/${book.bookImage}`}
                      alt={book.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border border-dark rounded p-2 text-center d-none d-md-table-cell">
                  {book.category}
                </td>
                <td className="border border-dark rounded p-2 text-center d-none d-md-table-cell">
                  {book.genre}
                </td>
                <td className="border border-dark rounded p-2 text-center d-none d-md-table-cell">
                  {book.author}
                </td>
                <td className="border border-dark rounded p-2 text-center d-none d-md-table-cell">
                  {book.publishYear}
                </td>
                <td className="border border-dark rounded p-2 text-center">
                  <div className="d-flex justify-content-center grid gap-0 column-gap-3">
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
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No books available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BooksTable;
