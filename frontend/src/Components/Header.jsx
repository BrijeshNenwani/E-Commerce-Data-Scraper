import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  return (
    <div className="w-full h-10 bg-black fixed z-50 top-0 flex justify-between items-center">
      <p className="text-white text-xl ms-10">
        <Link to="/">LDYoutube</Link>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchTerm !== "" && navigate(`search/${searchTerm}`);
        }}
        id="search__bar"
        className="h-full w-1/2 me-10 p-1 flex"
      >
        <button
          type="submit"
          className="text-white bg-red-600 px-2 rounded-s-md hover:opacity-80"
        >
          <span className="material-symbols-outlined pt-1 ps-1 rounded-md">
            search
          </span>
        </button>
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          placeholder="Search . . ."
          className="w-full h-full outline-none ps-3 pe-6 rounded-e-md"
        />
      </form>
    </div>
  );
};

export default Header;
