import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({ postID, category, title, desc, authorID, thumbnail }) => {
  const shortDesc = desc.length > 145 ? desc.substring(0, 145) + "..." : desc;
  const postTitle = title.length > 30 ? title.substring(0, 30) + "..." : title;
  return (
    <div className="container mx-auto p-8">
      <article className="bg-white p-4 rounded-md shadow-md border-2 border-red-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <Link to={`/posts/${postID}`}>
          <h2 className="text-xl font-bold text-gray-800">{postTitle}</h2>
        </Link>
        <p className="text-sm text-gray-600 mb-4 overflow-hidden text-ellipsis">
          {shortDesc}
        </p>
        <div className="text-sm text-gray-600">
          <PostAuthor />
          <Link
            to={`/posts/categories/${category}`}
            className="inline-block px-4 py-2 mt-2 font-semibold text-gray-600 bg-gray-200 rounded-md hover:bg-gray-400 transition duration-300"
          >
            {category}
          </Link>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
