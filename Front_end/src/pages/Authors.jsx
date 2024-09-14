import React, { useState } from "react";

import Avatar1 from "../images/avatar1.jpg";
import Avatar2 from "../images/avatar2.jpg";
import Avatar3 from "../images/avatar3.jpg";
import Avatar4 from "../images/avatar4.jpg";
import Avatar5 from "../images/avatar5.jpg";
import { Link } from "react-router-dom";

const authorData = [
  { id: 1, avatar: Avatar1, name: "John Doe", posts: 3 },
  { id: 2, avatar: Avatar2, name: "Jane Doe", posts: 5 },
  { id: 3, avatar: Avatar3, name: "Alice", posts: 2 },
  { id: 4, avatar: Avatar4, name: "Bob", posts: 4 },
  { id: 5, avatar: Avatar5, name: "Charlie", posts: 1 },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorData);
  return (
    <section className="py-8 px-4 bg-gray-100 min-h-screen">
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.map(({ id, avatar, name, posts }) => {
            return (
              <Link
                to={`/posts/users/${id}`}
                key={id}
                className="block p-4 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center space-x-4 py-4">
                  <img
                    src={avatar}
                    alt={`Image of ${name}`}
                    className="w-32 h-32 rounded-md mx-auto object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {name}
                  </h4>
                  <p className="text-sm text-gray-600">{posts} Posts</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="font-semibold text-2xl font-sans text-center min-h-screen">
          No authors found!
        </h2>
      )}
    </section>
  );
};

export default Authors;
