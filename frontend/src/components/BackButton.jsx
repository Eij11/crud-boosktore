import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="d-flex ">
      <Link to={destination} className="p-4">
        <BsArrowLeftCircle className="text-light fs-1 bg-info rounded-circle" />
      </Link>
    </div>
  );
};

export default BackButton;
