import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/avatar1.jpg";

const PostAuthor = () => {
  return (
    <Link
      to={`/posts/user/dfsadf`}
      className="flex items-center space-x-4 my-4"
    >
      <div>
        <img
          src={Avatar}
          className="h-12 w-12 rounded-full border-2 border-gray-300 "
        />
      </div>
      <div>
        <h5 className="text-lg font-semibold font-playfair">Author Name</h5>
        <small className="text-sm font-playfair"> Just Now</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
