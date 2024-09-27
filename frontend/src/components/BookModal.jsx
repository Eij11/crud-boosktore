import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onclose }) => {
  return (
    <div
      className="modal fade show bg-dark p-2 bg-opacity-50"
      tabIndex="-1"
      id={`bookModal-${book._id}`}
      style={{ display: "block", zIndex: 1050 }}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{book.title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onclose} // Close the modal when clicked
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishYear}</p>
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onclose} // Also close when the close button is clicked
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
