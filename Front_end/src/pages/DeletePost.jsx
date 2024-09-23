import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

const DeletePost = () => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  // redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Link
      to={`/posts/werwer/delete`}
      className="inline-block px-4 py-2 text-sm font-semibold text-white rounded bg-red-500 hover:bg-red-700 transition duration-300 "
    >
      Delete Post
    </Link>
  );
};

export default DeletePost;
