import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  return (
    <div>
      <div className="bg-red-900 p-8 w-full h-auto text-white text-6xl text-center border-b border-white font-playfair font-bold top-0 left-0 z-10">
        Sandwich Kongsi
      </div>
      <nav className="bg-red-900 p-3 w-full h-auto backdrop-filter backdrop-blur-lg">
        <ul className="sm:flex md:space-x-4 justify-between text-white font-playfair font-bold">
          <li>
            <Link to="/">
              <img src={logo} alt="Navbar Logo" className="h-12 w-auto" />
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block py-2 px-4">
              {" "}
              Profile{" "}
            </Link>
          </li>
          <li>
            <Link to="/create" className="block py-2 px-4">
              {" "}
              Create Post{" "}
            </Link>
          </li>
          <li>
            <Link to="/authors" className="block py-2 px-4">
              {" "}
              Authors{" "}
            </Link>
          </li>
          <li>
            <Link to="/logout" className="block py-2 px-4">
              {" "}
              Logout{" "}
            </Link>
          </li>
          <button className="block py-2 px-4">
            <FaBars />
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
